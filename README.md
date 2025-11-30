# StreamSync - Deployment Guide

**StreamSync** is a modern live streaming platform designed to be a functional clone of Twitch. It uses **OvenMediaEngine (OME)** for low-latency streaming (LL-HLS & WebRTC), **React** for the frontend, and containerized microservices for the backend.

---

## 🖥️ System Requirements

This stack is designed to run on Linux, macOS, or Windows via Docker.

### ⚙️ Hardware Recommendations (Minimum for Local Dev)
*   **CPU**: 4 vCPUs (Intel Core i5 / AMD Ryzen 5 or better).
*   **RAM**: 8 GB RAM (Docker containers + OME ingest require memory).
*   **Storage**: 20 GB free disk space.
*   **Network**: Broadband internet connection (for pulling Docker images).

### 🐧 OS Compatibility
*   **Ubuntu 22.04 LTS** (Recommended, works great on Proxmox LXC).
*   **Windows 10/11 Pro** (with WSL2 enabled).
*   **macOS Monterey+** (Apple Silicon M1/M2/M3 supported).

---

## 🚀 Deployment Instructions (Local / LXC)

These steps will deploy the full stack: Frontend, Backend Mock, OvenMediaEngine, Postgres, and Redis.

### 1. Prerequisites
Ensure you have **Git** and **Docker Compose** installed.

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker & Compose (Ubuntu)
sudo apt install -y docker.io docker-compose-plugin git

# Verify installation
docker compose version
```

### 2. Clone and Prepare
If you haven't already, navigate to your project folder.

```bash
cd StreamSync
```

### 3. Deploy with Docker Compose
This command builds the frontend image locally and pulls the backend/database images.

```bash
# Build images and start containers in the background
sudo docker compose up --build -d
```

> **Note:** The first build may take 3-5 minutes as it installs NPM dependencies and compiles the React app.

### 4. Verify Deployment
Check the status of your containers:

```bash
sudo docker compose ps
```

You should see 5 services in the `Up` state:
*   `streamsync-frontend-1` (Port 3000)
*   `streamsync-ovenmediaengine-1` (Ports 1935, 8080)
*   `streamsync-backend-1` (Port 4000)
*   `streamsync-postgres-1`
*   `streamsync-redis-1`

### 5. Access the Application
*   **Web UI**: Open `http://<YOUR_SERVER_IP>:3000`
*   **OME HLS**: `http://<YOUR_SERVER_IP>:8080`

---

## 🎥 Streaming Setup (OBS Studio)

To test the live streaming functionality:

1.  Open **OBS Studio** on your local computer.
2.  Go to **Settings > Stream**.
3.  **Service**: Custom
4.  **Server**: `rtmp://<YOUR_SERVER_IP>:1935/app`
5.  **Stream Key**: `test_stream`
6.  Go to **Settings > Output**:
    *   **Output Mode**: Advanced
    *   **Keyframe Interval**: `1 s` (Required for Low Latency)
    *   **Bitrate**: 2500 Kbps (Recommended for test)
    *   **Tune**: Zerolatency
7.  Click **Start Streaming**.

### Viewing the Stream
1.  Navigate to the web app (`http://<YOUR_SERVER_IP>:3000`).
2.  Since this is a dev scaffold with mock data, the video player might point to a placeholder.
3.  To verify the stream directly, use **VLC Media Player**:
    *   Open Network Stream: `http://<YOUR_SERVER_IP>:8080/app/test_stream/playlist.m3u8`

---

## 🔧 Troubleshooting

### "Dockerfile cannot be empty"
If you see this error, it means the file creation failed. Ensure the `Dockerfile` content provided in the codebase is saved correctly in the root directory.

### "Bind for 0.0.0.0:xxxx failed"
If a port is taken (e.g., port 3000 or 5432), edit `docker-compose.yml`:
```yaml
ports:
  - "3001:80" # Change host port to 3001
```

### Stream Buffering / Delay
Ensure OBS Keyframe Interval is set to **1s**. Default OBS settings (Auto/0) often cause 10s+ latency.

### Proxmox LXC Specifics
If running on a privileged container, ensure FUSE or nesting is enabled if you encounter Docker overlay filesystem issues, though standard unprivileged containers usually work fine with modern Docker versions.
