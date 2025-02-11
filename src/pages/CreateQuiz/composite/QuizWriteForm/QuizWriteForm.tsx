import { useEffect, useState } from "react";
import Button from "@/components/atom/Button/Button";
import QuestionForm from "@/pages/CreateQuiz/composite/QuizWriteForm/QuestionForm";
import { primary } from "@/styles/abstracts/colors.ts";
import { QuizQuestionType } from "@/types/QuizType";
import { QuestionFormType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { QuizPlus } from "@/svg/QuizPlus";
import { AnswerType } from "@/types/QuizType";
import React from "react";
import { useAtom } from "jotai";
import { QuizCreationType } from "@/types/QuizType";
import { isFirstVisitAtom, quizCreationInfoAtom } from "@/store/quizAtom";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./dnd/SortableItem";
import { Item } from "./dnd/Item";
import { DndPermissionPointerSensor } from "./dnd/DndPermissionPointerSensor";

//TODO: 아이콘 정리 필요
const QuizWriteForm = React.memo(() => {
  {
    const { quizCreationInfo, updateQuizCreationInfo } =
      useUpdateQuizCreationInfo();

    const deleteQuestion = async (targetId: number) => {
      setQuestionForms((prevQuizList) =>
        prevQuizList.filter(({ id }) => id !== targetId),
      );

      // TODO: useUpdateQuizCreationInfo 로직 확인 후 반영 필요
      await new Promise((resolve) =>
        setQuizCreationInfo((prev) => {
          const updatedQuestions =
            prev.questions?.filter((question) => question.id !== targetId) ??
            [];
          resolve(updatedQuestions);
          return {
            ...prev,
            questions: updatedQuestions,
          };
        }),
      );
    };

    const [activeFormId, setActiveFormId] = useState<string | null>(null);

    const sensors = useSensors(
      useSensor(DndPermissionPointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    );
    const handleUpdateQuestionFormsWithAnswerType = (
      questionId: number,
      newAnswerType: AnswerType,
    ) => {
      setQuestionForms((prevForms) =>
        prevForms.map((form) =>
          form.id === questionId
            ? {
                ...form,
                answerType: newAnswerType,
                component: createQuestionFormComponent(form.id, newAnswerType),
              }
            : form,
        ),
      );
    };

    const createQuestionFormComponent = (
      id: number,
      answerType: AnswerType,
    ) => (
      <QuestionForm
        key={id}
        questionFormId={id}
        deleteQuestion={deleteQuestion}
        answerType={answerType}
        onUpdateQuestionFormsWithAnswerType={
          handleUpdateQuestionFormsWithAnswerType
        }
      />
    );

    // 문제 폼 리스트 초기화
    const setInitialForms = (): QuestionFormType[] => {
      const quizWriteForms: QuestionFormType[] =
        quizCreationInfo.questions?.map(
          (question) =>
            ({
              id: question.id,
              answerType: question.answerType,
              component: createQuestionFormComponent(
                question.id!,
                question.answerType,
              ),
            }) as QuestionFormType,
        ) ?? [];

      return quizWriteForms;
    };

    const [questionForms, setQuestionForms] =
      useState<QuestionFormType[]>(setInitialForms());
    const [isFirstVisit] = useAtom(isFirstVisitAtom);

    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    useEffect(() => {
      const isFirstVisitInLocalStorageState =
        localStorage.getItem("firstVisit") !== "false";

      if (isInitialized || !isFirstVisitInLocalStorageState) {
        setIsInitialized(true);
        return;
      }

      // 가이드라인 단계 완료(로컬 스토리지 첫 방문 여부가 아직 "true"일 경우) 후 퀴즈 질문폼 초기화
      setQuestionForms([]);
      setIsInitialized(true);
      // 방문한 사용자로 표시
      localStorage.setItem("firstVisit", "false");
    }, [isFirstVisit]);

    const handleDragStart = (event: DragStartEvent) => {
      const { active } = event;
      setActiveFormId(active.id.toString());
    };

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setQuestionForms((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
        setQuizCreationInfo((prev) => {
          if (!prev.questions) return prev;

          const questions = [...prev.questions];
          const oldIndex = questions.findIndex(
            (question) => question.id === active.id,
          );
          const newIndex = questions.findIndex(
            (question) => question.id === over.id,
          );

          return {
            ...prev,
            questions: arrayMove(questions, oldIndex, newIndex),
          };
        });
      }

      setActiveFormId(null);
    };

    const [, setQuizCreationInfo] =
      useAtom<QuizCreationType>(quizCreationInfoAtom);

    const defaultAnswerType: AnswerType = "MULTIPLE_CHOICE_SINGLE_ANSWER";

    const createNewQuestion = (id: number): QuizQuestionType => ({
      id,
      content: "",
      selectOptions: [],
      answerExplanationContent: "",
      answerType: defaultAnswerType,
      answerExplanationImages: [],
      answers: [],
    });

    // 문제 추가 함수
    const addQuestionForm = (id: number) => {
      setQuestionForms((prev) => [
        ...prev,
        {
          id: id,
          answerType: defaultAnswerType,
          component: createQuestionFormComponent(id, defaultAnswerType),
        },
      ]);
    };

    // 문제 추가 버튼 클릭
    const onClickAddQuestionForm = () => {
      const id = Date.now();
      const newQuestion: QuizQuestionType = createNewQuestion(id);
      addQuestionForm(id);
      updateQuizCreationInfo("questions", [
        ...(quizCreationInfo.questions ?? []),
        newQuestion,
      ]);
    };

    return isInitialized ? (
      <section>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={questionForms.map((form) => ({ id: form.id }))}
            strategy={verticalListSortingStrategy}
          >
            {questionForms.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeFormId
              ? (() => {
                  const activeItem =
                    questionForms.find(
                      (item) => item.id.toString() === activeFormId,
                    ) ?? null;
                  return activeItem ? <Item item={activeItem} /> : null;
                })()
              : null}
          </DragOverlay>
        </DndContext>

        <Button
          size="large"
          onClick={onClickAddQuestionForm}
          fullWidth
          icon={<QuizPlus alt="" width={20} height={20} stroke={primary} />}
          color="secondary"
        >
          문제 추가하기
        </Button>
      </section>
    ) : null;
  }
});

export default QuizWriteForm;
