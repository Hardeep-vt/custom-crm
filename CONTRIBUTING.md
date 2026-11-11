# Contributing

## How we work (5 people, one repo)

1. **Pick a task.** Open the [project board](https://github.com/users/Hardeep-vt/projects/1) or the [issue list](https://github.com/Hardeep-vt/custom-crm/issues). Take the lowest-numbered issue in **To do** whose *Depends on* issues are all closed.
2. **Claim it.** Assign yourself and move it to **In progress**. Comment on the issue if you'll be slow. **One task per person at a time.**
3. **Branch** from the latest `main`: `git checkout main && git pull && git checkout -b t12-company-list`.
4. **Build it small.** Do only what the issue says. If you find more work, open a new issue rather than growing the PR.
5. **Open a PR** with `Closes #N` in it, fill in the template, and add screenshots for UI changes.
6. **Review.** Every PR needs **1 approval from a teammate** and **green CI**. Reviewers should respond within 24 hours.
7. **Merge** with *Squash and merge*. That auto-closes the issue and auto-deploys. Then pull `main` before your next task.
8. **Using an LLM** is encouraged: give it this file, the issue, and `docs/meetings/`. But you must be able to **explain every line** in your PR (Hardeep, 25/10).

**Migrations rule:** only one open PR at a time should add an Alembic migration, or rebase onto `main` before merging, to avoid two migration heads.
