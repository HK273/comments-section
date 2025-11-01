# Drizzle ORM + PostgreSQL

This section of the code handles setting up [Drizzle ORM](https://orm.drizzle.team/) & configuring the connection to a PostgreSQL instance.

**PLEASE NOTE: If you want to test any of the Drizzle ORM functionality you must have a valid value set for the DB_URL in .env.local. You can follow the below steps to set up the local Postgres instance**

1. **Install Docker and Container Runtime**: Ensure you have [Docker](https://formulae.brew.sh/formula/docker) installed and choose one of the following container runtime options:

   - **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**
   - **[Rancher Desktop](https://rancherdesktop.io/)**: An open-source alternative to Docker Desktop

   **Important**: You must start Docker Desktop or Rancher Desktop **before** running the compose file. The container runtime service must be running in the background. On Mac, you can verify it's running by checking for the Docker whale icon in the menu bar, or by running `docker ps` in your terminal.

2. There is a `compose.yaml` file available in the `postgres-local` folder. This will allow you to spin up a test postgres database to work with.

```bash
# From within the directory
docker-compose -f compose.yaml up --build
# In detached mode - containers will be started in the background and not attached to the current terminal.
docker-compose -f compose.yaml up -d
```

---

```bash
# From the root of the project
docker-compose -f app/db/postgres-local/compose.yaml up --build
# Detached mode
docker-compose -f app/db/postgres-local/compose.yaml up -d
```

**You may need to restart Docker if you receive the following errors: ✘ pgadmin Error and/or ✘ postgres Error**

3. Navigate to [http://localhost:5050](http://localhost:5050) which will give you a pgAdmin instance. From here enter the `PGADMIN_DEFAULT_EMAIL` & `PGADMIN_DEFAULT_PASSWORD` specified in the container

4. You need to create a server...

- Right click on `Servers` and select `Register`
- Enter a name
- On the connection tab set the `Host name/address` to `postgres` set the `Username` and `Password` to the values specified in the container for `POSTGRES_USER` & `POSTGRES_PASSWORD`

5. Update your `.env.local` file so that it has the correct connection URI. The `DB_URL` env var needs to be set in this format `postgresql://USER:PASSWORD@INTERNAL_HOST:PORT/DATABASE`. You should end up with something like `postgresql://admin:root@localhost:5432/test_db`

6. To create database migration files, run `npx drizzle-kit generate`. This will create SQL migration files in the `drizzle` folder based on the table configurations in `models.ts`. **Please note this is only required for first time set up or if you are making changes to model.ts. You can skip to step 9, running `npm run migrate` for existing set ups!**

7. To apply the migrations, run `npm run migrate`. This will execute the migration files and update your database schema.

8. Once setup, you can also use `npx drizzle-kit studio` for a nice simple database UI

9. If you are running multiple containerised DB's within this project or others you should update the ports on each one running to avoid conflicts

```yaml
services:
  postgres:
    ports:
      - '5434:5432' # PostgreSQL on different port
  pgadmin:
    ports:
      - '5051:80' # pgAdmin on different port too
```

Similarly, if you frequently change between DB's running single instances at a time, simply update your volumes name

```yaml
# Project 1
volumes:
  - postgres-data:/var/lib/postgresql/data
# And don't forget to update the volume reference also!
volumes:
  service-catalogue-data:

# Project 2
volumes:
    - my-amazing-volume:/var/lib/postgresql/data
# And don't forget to update the volume reference also!
volumes:
  my-amazing-volume:
```

## Drizzle Files

Drizzle stores and generates a number of files to track migrations occurring within the DB.

- `_journal.json`: Acts as a log that tracks which migrations have been applied to the database, ensuring that Drizzle knows which changes need to be executed when migrating to a new state.
- Snapshots (e.g `0000_snapshot.json`):Drizzle uses these files to understand the structure of your database at different points in time, allowing it to identify what has changed and generate the necessary SQL code to update your database to the latest schema.
- SQL files (e.g. `000_high_shockwave.sql`): The actual SQL generated from schema changes in `models.ts`, produced via the `npx drizzle-kit generate` command. This is the SQL that actually get's run against the DB when you run `npm run migrate`

## When using Drizzle as part of an MR....

**For authors:**

1. Make schema changes in models.ts
2. Run npx drizzle-kit generate
3. Review the generated migration file
4. Commit both models.ts changes AND the new migration file

**For reviewers:**

1. Pull latest code
2. Run npm run migrate to apply any new migrations
3. Run seed script if needed

If things become out of sync, you may need to remove your docker [volume](https://docs.docker.com/engine/storage/volumes/) and start the local DB instance again!

1. `docker-compose -f app/db/postgres-local/compose.yaml down`

2. `docker volume rm postgres-local_postgres-data`

3. `docker-compose -f app/db/postgres-local/compose.yaml up -d`

4. Register server again following step 4 from the above section

5. `npm run migrate`

6. Run seed script if needed

If you run into other conflicts that are not resolved by the below, e.g. table names or columns start conflicting, there could be an issue with the way migrations have been applied previously meaning certain changes haven't been picked up in the right order. When this happens it really is a case of trying to debug the offending column and figure out where a change has been missed.

For example, getting conflicts on an update made to a sequence id (`error: relation "services_service_id_seq" does not exist`). In this instance adding a custom migration file via `drizzle-kit generate --custom --name=sequence-id-update` and then adding in the necessary SQL to update the table resolved the issue

## Data Model

**_All tables are stored in the `models.ts` file_**

## Useful Resources

- [Database connections with Drizzle](https://orm.drizzle.team/docs/connect-overview)
- [Drizzle Schema Migration](https://orm.drizzle.team/docs/migrations)
- [Drizzle Schema Declaration](https://orm.drizzle.team/docs/sql-schema-declaration)
- [Drizzle Queries + CRUD](https://orm.drizzle.team/docs/data-querying)
- [drizzle-kit studio](https://orm.drizzle.team/docs/drizzle-kit-studio)
- [Connection URIs](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
- [PostgreSQL](https://www.postgresql.org/about/)
- [Psql](https://www.postgresguide.com/utilities/psql/)
- [pgAdmin](https://www.pgadmin.org/)

## Useful Commands

- `npx drizzle-kit generate`: Generate SQL migration files based on your schema changes
- `npm run migrate`: Apply all pending migrations to your database
- `npx drizzle-kit push`: Accept all migration file changes and push straight to the DB. Be careful when using this as it disregards all previous migration history and can lead to things becoming out of sync. It shouldn't be used if you are following a [migrate](https://orm.drizzle.team/docs/drizzle-kit-migrate) based approach but is useful for development/prototyping when you don't need change history
- `npx drizzle-kit studio`: Gives you a nice UI for viewing and querying the data available via https://local.drizzle.studio/

## General Notes

You may run into an issue with `npx drizzle-kit generate` where it does not create the \_journal.json file in drizzle/meta/. This file is super important as it tracks the history and metadata of the database migrations.

You may see an error like the below when trying to run the command...

```bash
Error: ENOENT: no such file or directory, open 'drizzle/meta/_journal.json'
```

When this happens you can simply create the file with an empty journal like the below...

```json
{ "version": "5", "dialect": "pg", "entries": [] }
```
