---
layout: post
title: 'Postgresql: Getting Started with Docker'
date: '2023-02-04 20:50:13 +0530'
categories: [DATABASE]
tags: [postgresql, database, docker]
---

If you're venturing into the realm of PostgreSQL and Docker, this guide will help you set up a PostgreSQL instance quickly and efficiently using Docker containers. Follow the steps below to get started with ease.

## Docker Command

The key to starting a PostgreSQL container lies in a simple Docker command. Copy and paste the following into your terminal:

```shell
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres
```

This command initializes a PostgreSQL container with the necessary configurations.

Upon running the command, you'll see initialization logs indicating the setup process, and if all goes well, you should see a success message. The PostgreSQL server is now ready to accept connections.

```shell
The files belonging to this database system will be owned by user "postgres".
This user must also own the server process.

The database cluster will be initialized with locale "en_US.utf8".
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.

fixing permissions on existing directory /var/lib/postgresql/data ... ok
creating subdirectories ... ok
selecting dynamic shared memory implementation ... posix
selecting default max_connections ... 100
selecting default shared_buffers ... 128MB
selecting default time zone ... Etc/UTC
creating configuration files ... ok
running bootstrap script ... ok
performing post-bootstrap initialization ... ok
syncing data to disk ... ok


Success. You can now start the database server using:

    pg_ctl -D /var/lib/postgresql/data -l logfile start

initdb: warning: enabling "trust" authentication for local connections
initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.
waiting for server to start....2023-02-04 15:38:17.648 UTC [48] LOG:  starting PostgreSQL 15.1 (Debian 15.1-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
2023-02-04 15:38:17.653 UTC [48] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2023-02-04 15:38:17.666 UTC [51] LOG:  database system was shut down at 2023-02-04 15:38:17 UTC
2023-02-04 15:38:17.674 UTC [48] LOG:  database system is ready to accept connections
 done
server started

/usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*

waiting for server to shut down....2023-02-04 15:38:17.785 UTC [48] LOG:  received fast shutdown request
2023-02-04 15:38:17.794 UTC [48] LOG:  aborting any active transactions
2023-02-04 15:38:17.796 UTC [48] LOG:  background worker "logical replication launcher" (PID 54) exited with exit code 1
2023-02-04 15:38:17.797 UTC [49] LOG:  shutting down
2023-02-04 15:38:17.801 UTC [49] LOG:  checkpoint starting: shutdown immediate
2023-02-04 15:38:17.829 UTC [49] LOG:  checkpoint complete: wrote 3 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.009 s, sync=0.004 s, total=0.033 s; sync files=2, longest=0.002 s, average=0.002 s; distance=0 kB, estimate=0 kB
2023-02-04 15:38:17.834 UTC [48] LOG:  database system is shut down
 done
server stopped

PostgreSQL init process complete; ready for start up.

2023-02-04 15:38:17.919 UTC [1] LOG:  starting PostgreSQL 15.1 (Debian 15.1-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
2023-02-04 15:38:17.919 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2023-02-04 15:38:17.919 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2023-02-04 15:38:17.928 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2023-02-04 15:38:17.940 UTC [62] LOG:  database system was shut down at 2023-02-04 15:38:17 UTC
2023-02-04 15:38:17.949 UTC [1] LOG:  database system is ready to accept connections
```

## Validate the Container

To ensure that the PostgreSQL container is up and running, use the following Docker command:

```shell
docker ps -a
```

This command provides information about all your Docker containers. Look for the PostgreSQL container in the list, and you should see details such as the container ID, image used, status, and mapped ports.

```shell
CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                    NAMES
a2a2bbebb5f1   postgres   "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes   0.0.0.0:5432->5432/tcp   postgresql
```

This output confirms that the PostgreSQL container is running, and port 5432 on your host machine is mapped to the PostgreSQL container.

## Login to PostgreSQL

Now that the PostgreSQL container is running, you can log in to the PostgreSQL database using your preferred database client. Here are the details you'll need:

- **Host:** localhost
- **Port:** 5432
- **User:** postgres
- **Password:** postgres

Use these credentials to connect to your PostgreSQL instance and start working with databases.

With these simple steps, you've successfully set up a PostgreSQL database using Docker, providing a flexible and scalable environment for your database needs. Happy coding!
