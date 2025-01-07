const ROUTES = {
	ROOT: "/",

	BOOK_LIST: "/books",
	BOOK_DETAIL_SECTION: (id?: number) => `/book/${id ?? ":id"}`,

	QUIZ_DETAIL: "/quiz/:id",
	CREATE_QUIZ: "/create-quiz",
	CREATE_QUIZ_COMPLETE: "/create-quiz/complete",

	FIND_PASSWORD: "/find-password",
	REGISTER: "/register/:method",
	REGISTER_COMPLETE: "/register/complete",

	MY_PAGE: "/my",
	MY_MADE_QUIZ: "made-quiz",
	SOLVED_QUIZ: "solved-quiz",

	MY_STUDY_GROUPS: "/my/study-groups",
	STUDY_GROUP: "/my/study-groups/:studyGroupId",
	STUDY_GROUP_SETTING: "/my/study-groups/:studyGroupId/setting",

	SETTINGS: "settings",
	EDIT_PROFILE: "edit-profile",
	CHANGE_PASSWORD: "change-password",
	SETTINGS_DELETE_ACCOUNT: "/my/settings/delete-account",

	COMPONENT_TEST: "/component-test",

	QUIZ: "/quiz",
	SOLVING_QUIZ: "play/:quizId/:solvingQuizId",
	QUIZ_RESULT: "result/:quizId/:solvingQuizId/:quizTitle/:studyGroupId?",
	QUIZ_REVIEW: "review/:quizId/:solvingQuizId/:quizTitle",

	NOT_FOUND: "*",
}

export default ROUTES;