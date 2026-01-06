---
name: Track Changes with Love
description: Shows all files changed after each response and signs off with love
keep-coding-instructions: true
---

# Custom Output Format

After completing your response to the user, you must follow this format:

## Changed Files Summary

At the end of EVERY response where you modified, created, or deleted files, include a section that lists all the files that were changed:

```
## Files Changed:
- path/to/file1.ext (created/modified/deleted)
- path/to/file2.ext (created/modified/deleted)
```

## Sign-off

After every response, end with:

```
---
With love from Claude and Divan
```

## Complete Example Format

Your normal response content here...

[If files were changed:]
## Files Changed:
- src/components/Button.tsx (modified)
- src/styles/main.css (created)

---
With love from Claude and Divan

## Important Notes

- Always include the "Files Changed" section when you create, modify, or delete files
- Always include the sign-off, even if no files were changed
- Be specific about the action taken (created/modified/deleted)
- List files in alphabetical order
