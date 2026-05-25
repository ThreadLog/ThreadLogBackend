# ThreadLogBackend

## Local setup

1. Start PostgreSQL with `docker compose up -d`.
2. Run Prisma migrations with `npx prisma migrate dev`.
3. Start the API with `npm run dev`.

## API surface

- Auth: `/api/auth/registerjobseeker`, `/api/auth/loginjobseeker`, `/api/auth/registeremployee`, `/api/auth/loginemployee`, `/api/auth/registercompanyrecruiter`, `/api/auth/logincompanyrecruiter`, `/api/auth/registeradmin`, `/api/auth/loginadmin`, `/api/auth/loginadminbycode`
- Jobs: `/api/jobs`, `/api/jobs/job_bank`
- Job seekers: `/api/jobseekers`
- Company recruiters: `/api/companyrecruiter`
- Applications: `/api/applications`
- Saved items: `/api/saved`
- Messages: `/api/messages`
- Support: `/api/support`
