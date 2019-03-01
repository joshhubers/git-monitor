chpwd() {
	inside_git_repo="$(git rev-parse --is-inside-work-tree 2>/dev/null)"

	if [ "$inside_git_repo" ]; then
		BRANCH=$(git rev-parse --abbrev-ref HEAD)
		REPO_URL=$(git config --get remote.origin.url)
    REPO_URL=${REPO_URL#"https://github.com/"}
    REPO_URL=${REPO_URL%".git"}

    ( ssh pi@pi "echo '{ branch: $BRANCH, repoUrl: $REPO_URL, auth: $GIT_MONITOR_AUTH }' > repoConfig.json" & )
	fi
}
