import { useState } from "react";
import Button from "@/components/atom/Button/Button";
import QuestionForm from "@/pages/CreateQuiz/composite/quizWriteForm/questionForm";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { primary } from "@/styles/abstracts/colors.ts";
import { QuizQuestionType } from "@/types/QuizType";
import { QuestionFormType } from "@/types/QuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { QuizPlus } from "@/svg/quizPlus";
import { AnswerType } from "@/types/QuizType";
//TODO: 아이콘 정리 필요
export default function QuizWriteForm() {
  const { quizCreationInfo, updateQuizCreationInfo } = useUpdateQuizCreationInfo();
  const defaultAnswerType:AnswerType = "MULTIPLE_CHOICE_SINGLE_ANSWER"

  const deleteQuestion = (targetId: number) => {
    setQuestionForms((prevQuizList) =>
      prevQuizList.filter(({ id }) => id !== targetId)
    );

    const updatedQuestions =
      quizCreationInfo.questions?.filter(
        (question) => question.id !== targetId
      );
    updateQuizCreationInfo("questions", updatedQuestions);
  };

  const setInitialForms = (): QuestionFormType[] => {
    const quizWriteForms: QuestionFormType[] =
      quizCreationInfo.questions?.map(
        (question) =>
        ({
          id: question.id,
          answerType: question.answerType,
          component: (
            <QuestionForm
              questionFormId={question.id}
              deleteQuestion={deleteQuestion}
              answerType={question.answerType}
            />
          ),
        } as QuestionFormType)
      ) ?? [];

    return quizWriteForms;
  };
  const [questionForms, setQuestionForms] = useState<QuestionFormType[]>(setInitialForms());

  const reorderItems = (items: any[], result: DropResult) => {
    const reorderedItems = [...items];
    const [movedItem] =  reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination!.index, 0, movedItem);
    return reorderedItems
  }

  const moveQuestions = (result: DropResult) => {
    if (!result.destination) return;

    const updatedQuestionForms = reorderItems(questionForms, result);
    setQuestionForms(updatedQuestionForms);

    const updatedGlobalQuizItems = reorderItems(quizCreationInfo.questions ?? [], result);
    updateQuizCreationInfo("questions", updatedGlobalQuizItems);
  };

  const createNewQuestion = (id: number): QuizQuestionType => ({
    id,
    content: "",
    selectOptions: [],
    answerExplanationContent: "",
    answerType: defaultAnswerType,
    answerExplanationImages: [],
    answers: [],
  });

  const addQuestionForm = (id: number) => {
    setQuestionForms((prev) => [
      ...prev,
      {
        id: id,
        answerType: defaultAnswerType,
        component: (
          <QuestionForm
            questionFormId={id}
            deleteQuestion={deleteQuestion}
            answerType={defaultAnswerType}
          />
        ),
      },
    ]);
  };

  const onClickAddQuestionForm = () => {
    const id = Date.now();
    const newQuestion: QuizQuestionType = createNewQuestion(id);
    addQuestionForm(id);
    updateQuizCreationInfo("questions", [
      ...(quizCreationInfo.questions ?? []),
      newQuestion,
    ]);
    console.log("info: %o", quizCreationInfo);
  };

  return (
    <section>
      <DragDropContext onDragEnd={moveQuestions}>
        <Droppable droppableId="cardlists">
          {(provided) => (
            <div
              className="cardlists"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {questionForms.map((item, index) => (
                <Draggable
                  draggableId={`${item.id}`}
                  index={index}
                  key={`${item.id}`}
                >
                  {(provided) => {
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <div key={item.id}>{item.component}</div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        size="large"
        onClick={onClickAddQuestionForm}
        fullWidth
        icon={
          <QuizPlus
            alt="스터디 그룹 추가 버튼"
            width={20}
            height={20}
            stroke={primary}
          />
        }
        color="secondary"
      >
        문제 추가하기
      </Button>
    </section>
  );
}
