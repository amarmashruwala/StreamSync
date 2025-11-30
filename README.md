# StreamSync - Deployment Runbook

**StreamSync** is a high-performance live streaming platform (Twitch clone) powered by **OvenMediaEngine (OME)** for sub-second latency streaming (LL-HLS & WebRTC). This guide details how to build, run, and deploy the application from a local developer machine to a production Kubernetes cluster.

---

## 🏗 System Architecture

*   **Frontend**: React 18 SPA (Vite, TypeScript, Tailwind).
*   **Media Server**: OvenMediaEngine (RTMP Ingest, WebRTC/LL-HLS Delivery).
*   **Backend**: Node.js/Express (Placeholder in Docker Compose).
*   **Database**: PostgreSQL 15.
*   **Cache/PubSub**: Redis 7.
*   **Ingress/Reverse Proxy**: Nginx (Frontend container) / Ingress Controller (K8s).

---

## 💻 Phase 1: Local Development

Run the entire stack on your machine using Docker Compose.

### Prerequisites
*   Docker Desktop & Docker Compose installed.
*   [OBS Studio](https://obsproject.com/) (for pushing live streams).
*   Node.js 18+ (optional, for local frontend dev outside Docker).

### Step-by-Step Guide

1.  **Clone & Inspect**
    Ensure you have the following project structure:
    ```
    .
    ├── docker-compose.yml
    ├── ome_config/Server.xml
    ├── k8s/ (Deployment manifests)
    ├── src/ (Frontend source)
    └── Dockerfile
    ```

2.  **Start the Stack**
    ```bash
    docker compose up --build -d
    ```
    *   **Frontend**: [http://localhost:3000](http://localhost:3000)
    *   **OvenMediaEngine API/HLS**: [http://localhost:8080](http://localhost:8080)
    *   **RTMP Ingest**: `rtmp://localhost:1935/app`

3.  **Test Streaming (OBS)**
    *   Open OBS Settings > **Stream**.
    *   **Service**: Custom
    *   **Server**: `rtmp://localhost:1935/app`
    *   **Stream Key**: `test`
    *   Click **Start Streaming**.

4.  **Test Playback**
    *   Open VLC Media Player > Open Network Stream.
    *   URL: `http://localhost:8080/app/test/manifest.m3u8`
    *   *Note: In the browser app, the video player simulates playback. To integrate real playback, update `components/VideoPlayer.tsx` to use `ovenplayer` library.*

---

## 🚀 Phase 2: Production Deployment (Kubernetes)

This guide assumes a standard Kubernetes cluster (EKS, GKE, DigitalOcean) with NGINX Ingress Controller and Cert-Manager installed.

### 1. Namespace & Secrets
Create a dedicated namespace and secure credentials.

```bash
kubectl create namespace streamsync

# Create database and JWT secrets
kubectl create secret generic app-secrets \
  --from-literal=DB_PASSWORD='change_me_production_password' \
  --from-literal=JWT_SECRET='change_me_jwt_secret' \
  -n streamsync
```

### 2. Deploy OvenMediaEngine (StatefulSet)
OME requires a stable network identity.

1.  **Create ConfigMap**:
    ```bash
    kubectl create configmap ome-config \
      --from-file=Server.xml=ome_config/Server.xml \
      -n streamsync
    ```

2.  **Apply Manifest** (`k8s/ome.yaml`):
    *   *Ensure your YAML defines a Service opening ports 1935 (RTMP), 8080 (HLS), and 3333 (API).*
    ```bash
    kubectl apply -f k8s/ome.yaml
    ```

### 3. Deploy Frontend App
The frontend is built into a static Nginx container.

1.  **Build & Push Docker Image**:
    ```bash
    docker build -t your-registry/streamsync-frontend:latest .
    docker push your-registry/streamsync-frontend:latest
    ```

2.  **Apply Manifest** (`k8s/frontend.yaml`):
    ```bash
    kubectl apply -f k8s/frontend.yaml
    ```

### 4. Ingress Configuration
Expose the services via HTTPS.

**Example `k8s/ingress.yaml`:**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: streamsync-ingress
  namespace: streamsync
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/proxy-body-size: "0" # Disable body limit for uploads
spec:
  ingressClassName: nginx
  rules:
  - host: live.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port: {number: 80}
      - path: /app # Route HLS/WebRTC traffic to OME
        pathType: Prefix
        backend:
          service:
            name: ome-origin
            port: {number: 8080}
```
Apply: `kubectl apply -f k8s/ingress.yaml`

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml` to automate deployment.

```yaml
name: Deploy
on:
  push:
    branches: [ "main" ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Docker Login
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USER }}
          password: ${{ secrets.DOCKER_TOKEN }}
          
      - name: Build & Push
        run: |
          docker build -t myrepo/streamsync:${{ github.sha }} .
          docker push myrepo/streamsync:${{ github.sha }}
          
      - name: Deploy to K8s
        uses: azure/k8s-set-context@v3
        with:
          kubeconfig: ${{ secrets.KUBE_CONFIG }}
          
      - name: Update Image
        run: |
          kubectl set image deployment/frontend web=myrepo/streamsync:${{ github.sha }} -n streamsync
```

---

## 🛡️ Security & Scaling Checklist

1.  **Firewall**:
    *   Open TCP `1935` (RTMP) on the Load Balancer for OBS.
    *   Open UDP `10000-10005` (WebRTC) if using low latency.
    
2.  **CORS**:
    *   Update `ome_config/Server.xml` `<CrossDomains>` to allow only your frontend domain (`https://live.yourdomain.com`).

3.  **Scaling**:
    *   **Origin**: Vertical scaling (High CPU/RAM) for transcoding.
    *   **Edge**: Horizontal scaling. Deploy separate OME Edge pods and configure `<OriginMapStore>` to pull from Origin.

4.  **Database**:
    *   Use a managed database (AWS RDS / Google Cloud SQL) for production instead of the containerized Postgres.

---

## 🔧 Troubleshooting

| Issue | Check | Command |
| :--- | :--- | :--- |
| **Stream Lagging** | Is LL-HLS enabled? | Check `Server.xml` `<LLHLS>` tags. |
| **OBS Can't Connect** | Is Port 1935 open? | `telnet your-server-ip 1935` |
| **Video 404** | Is the stream key correct? | Check logs: `kubectl logs -l app=ovenmediaengine -n streamsync` |
| **CORS Errors** | XML Config | Ensure `<Url>*</Url>` or valid domain is set in `Server.xml`. |

