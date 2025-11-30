# StreamSync - Developer Deployment Guide

**StreamSync** is a modern live streaming platform (Twitch clone) powered by **OvenMediaEngine (OME)** for sub-second latency streaming.

This document serves as the primary runbook for deploying the application on a **Local Machine** for development and testing purposes.

---

## 🖥️ System Requirements

Before running the stack locally, ensure your machine meets the following specifications. The application relies heavily on Docker, and video streaming/transcoding (even in bypass mode) requires moderate resources.

### Hardware
*   **CPU**: 
    *   *Minimum*: Dual-Core Processor (Intel Core i5 / AMD Ryzen 3 or equivalent).
    *   *Recommended*: Quad-Core Processor (Intel Core i7 / AMD Ryzen 7 / Apple M1/M2/M3).
    *   *Note*: AVX2 instruction set support is recommended for OME if you plan to enable server-side transcoding later.
*   **RAM**:
    *   *Minimum*: 8 GB (Docker needs at least 4GB allocated).
    *   *Recommended*: 16 GB or higher.
*   **Storage**:
    *   At least 10 GB of free disk space for Docker images and logs.
*   **Network**:
    *   Stable local network connection.
    *   Open ports: `3000`, `4000`, `8080`, `1935`, `3333` (ensure no other services like local web servers are blocking these).

### Operating System
The stack is containerized, so it runs on any OS that supports Docker:
*   **Windows**: Windows 10/11 Pro (WSL2 backend recommended).
*   **macOS**: macOS Monterey 12.0+ (Apple Silicon or Intel).
*   **Linux**: Ubuntu 20.04+, Fedora, or Debian 11+.

---

## 🛠️ Software Prerequisites

1.  **Docker Desktop** (or Docker Engine + Compose plugin)
    *   [Download Docker](https://www.docker.com/products/docker-desktop/)
    *   *Verify*: Run `docker --version` and `docker compose version` in your terminal.
2.  **Git**
    *   [Download Git](https://git-scm.com/downloads)
3.  **OBS Studio** (Open Broadcaster Software)
    *   Used to push video streams to the server.
    *   [Download OBS](https://obsproject.com/)

---

## 🚀 Step-by-Step Local Deployment

### 1. Clone & Setup
Open your terminal (PowerShell, Terminal, or Bash).

```bash
# Clone the repository (if applicable, or navigate to your project folder)
cd streamsync

# Check that the necessary config files exist
ls -F
# You should see: docker-compose.yml, Dockerfile, ome_config/, src/
```

### 2. Start the Application Stack
We will use Docker Compose to build the frontend and spin up the backend services (Postgres, Redis, OvenMediaEngine).

```bash
# Build and start services in detached mode (background)
docker compose up --build -d
```

**What happens next?**
*   Docker will download the `postgres`, `redis`, and `ovenmediaengine` images.
*   It will build the `frontend` image using the local `Dockerfile`.
*   This process may take 2-5 minutes depending on your internet connection.

### 3. Verify Services
Check if all containers are running and healthy.

```bash
docker compose ps
```

You should see 4 containers with Status `Up`:
1.  `streamsync-frontend-1` (Port 3000)
2.  `streamsync-backend-1` (Port 4000)
3.  `streamsync-ovenmediaengine-1` (Ports 1935, 8080, 3333)
4.  `streamsync-postgres-1`
5.  `streamsync-redis-1`

### 4. Access the Web Interface
Open your web browser and navigate to:
*   **http://localhost:3000**

You should see the StreamSync landing page.

---

## 🎥 Streaming Setup (OBS Studio)

To test the application, you need to broadcast a live video feed to your local server.

1.  Open **OBS Studio**.
2.  Click **Settings** (bottom right) > **Stream**.
3.  Configure the following settings:
    *   **Service**: `Custom...`
    *   **Server**: `rtmp://localhost:1935/app`
    *   **Stream Key**: `test_stream` (You can use any string here, but remember it).
4.  **Output Settings** (Optional but recommended for testing):
    *   Go to **Output** tab.
    *   **Output Mode**: Advanced.
    *   **Keyframe Interval**: `1 s` or `2 s` (Critical for low latency).
    *   **Tune**: `Zerolatency`.
5.  Click **OK**.
6.  Add a Source (e.g., "Video Capture Device" for webcam, or "Color Source" for a test screen).
7.  Click **Start Streaming**.

If successful, the green square in the bottom right of OBS will light up, showing a bitrate (e.g., `2500 kb/s`).

---

## 📺 Watching the Stream

1.  Go back to your browser at **http://localhost:3000**.
2.  Since this is a demo environment with mock data, the frontend doesn't automatically detect your specific stream key yet.
3.  To verify playback manually:
    *   Open **VLC Media Player**.
    *   **File** > **Open Network**.
    *   Enter: `http://localhost:8080/app/test_stream/playlist.m3u8`
    *   Click **Open**.
4.  *Frontend Integration*: To see it in the web app, modify `pages/Channel.tsx` or `components/VideoPlayer.tsx` to point to the URL above instead of the mock poster image.

---

## 🔧 Troubleshooting

### "Bind for 0.0.0.0:xxxx failed: port is already allocated"
This means another program is using a required port.
*   **Port 3000**: Often React scripts or another Node app.
*   **Port 5432**: Local Postgres installation.
*   **Port 8080**: Common for other web servers.
*   **Solution**: Stop the conflicting service, or modify `docker-compose.yml` to map to a different host port (e.g., `"3001:80"`).

### "Connection Refused" in OBS
*   Ensure the `ovenmediaengine` container is running (`docker compose ps`).
*   Ensure Docker Desktop is actually running.
*   Check firewall settings to ensure Port 1935 is allowed.

### Video Lag / High Latency
*   OvenMediaEngine is configured for LL-HLS (Low Latency HLS).
*   In OBS, ensure **Keyframe Interval** is set to **1s**. A high keyframe interval (default 10s or auto) causes massive buffering delays.

### CORS Errors in Browser Console
*   If you see CORS errors when trying to play video in a web player, check `ome_config/Server.xml`.
*   Ensure `<CrossDomains><Url>*</Url></CrossDomains>` is present under the `Host` configuration.

---

## 📦 Production Architecture (Reference)

For deploying to production (Kubernetes/Cloud), refer to the file `k8s/ome.yaml` and `k8s/frontend.yaml` in this repository.

*   **Ingest**: RTMP (Port 1935)
*   **Playback**: LL-HLS (Port 8080/443 via Ingress)
*   **Scaling**: StatefulSet for OME Origin, Deployments for Frontend/Backend.
