@echo off
REM Step 1: Clone mirror of the repo
echo 🔁 Cloning mirror...
git clone --mirror . ../AI-Learning-Platform-clean

REM Step 2: Enter the new mirror folder
cd ../AI-Learning-Platform-clean

REM Step 3: Create replacement rule
echo sk-proj====REMOVED-OPENAI-KEY=== > replacements.txt

REM Step 4: Run filter-repo
echo 🧹 Cleaning history...
"C:\Users\shv32\AppData\Roaming\Python\Python313\Scripts\git-filter-repo.exe" --replace-text replacements.txt --force

REM Step 5: Push back to origin (force)
echo 🚀 Pushing cleaned repo to GitHub...
git remote set-url origin https://github.com/ShulamitVizel/AI-Learning-Platform.git
git push --force

REM Step 6: Done
echo ✅ Done! You can now use the cleaned repo.
pause
