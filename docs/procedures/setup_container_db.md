# How to Configure a MongoDB Database with Podman

## 1. Create a Volume

Creating a volume ensures that your MongoDB data is **persistent** even if the container is removed.

```sh
podman volume create edutrackdb
```

## 2. Pull the MongoDB Image

Download the official MongoDB image from Docker Hub:

```sh
podman pull docker.io/library/mongo:8.2.1
```

## 3. Create and Start a MongoDB Container with the Volume

Run the MongoDB container, attaching the volume you created:

```sh
podman run -d --name edutrack_mongo -p 27017:27017 -v edutrackdb:/data/db mongo:8.2.1
```

- `-d` runs the container in detached mode
- `--name` assigns a name to the container (`edutrack_mongo`)
- `-p 27017:27017` maps the default MongoDB port
- `-v edutrackdb:/data/db` mounts the persistent volume

## 4. Start the Existing Container

If the container has already been created, start it with:

```sh
podman start edutrack_mongo
```

## 5. Stop the Running Container

To stop the container:

```sh
podman stop edutrack_mongo
```
