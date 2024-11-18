import { useState } from "react";
import styles from "./_quiz_write_form.module.scss";
import Button from "@/components/atom/button/button.tsx";
import QuizWriteFormItem from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormItem.tsx";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { Plus } from "@/svg/plus.tsx";
import { primary } from "@/styles/abstracts/colors.ts";
import { BookQuizQuestionType } from "@/types/BookQuizType";
import { QuizWriteFormItemType } from "@/types/BookQuizType";
import useUpdateQuizCreationInfo from "@/hooks/useUpdateQuizCreationInfo";
import { QuizPlus } from "@/svg/quizPlus";

export default function QuizWriteForm() {
  const { quizCreationInfo, updateQuizCreationInfo } =
    useUpdateQuizCreationInfo();

  const deleteQuizWriteForm = (targetId: number) => {
    setQuizWriteList((prevQuizList) =>
      prevQuizList.filter(({ id }) => id !== targetId)
    );

    const updatedQuestions =
      quizCreationInfo.questions?.filter(
        (question) => question.id !== targetId
      ) ?? [];
    updateQuizCreationInfo("questions", updatedQuestions);
  };

  const setInitialForms = (): QuizWriteFormItemType[] => {
    const quizWriteForms: QuizWriteFormItemType[] =
      quizCreationInfo.questions?.map(
        (question) =>
          ({
            id: question.id,
            quizWriteFormType: question.answerType,
            component: (
              <QuizWriteFormItem
                id={question.id}
                deleteQuizWriteForm={deleteQuizWriteForm}
                quizWriteFormType={question.answerType}
              />
            ),
          } as QuizWriteFormItemType)
      ) ?? [];

    return quizWriteForms;
  };
  const [quizWriteFormList, setQuizWriteList] = useState<
    QuizWriteFormItemType[]
  >(setInitialForms());

  const moveQuizWriteForm = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...quizWriteFormList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuizWriteList(items);

    //TODO: quiz, questions 이름 api와 통일 필요
    //TODO: 위의 겹치는 로직과 리팩토링 필요
    const globalQuizItems = [...(quizCreationInfo.questions ?? [])];
    const [reorderedGlobalItem] = globalQuizItems.splice(
      result.source.index,
      1
    );
    globalQuizItems.splice(result.destination.index, 0, reorderedGlobalItem);
    updateQuizCreationInfo("questions", globalQuizItems);
  };

  const createNewQuestion = (id: number): BookQuizQuestionType => ({
    id,
    content: "",
    selectOptions: [],
    answerExplanationContent: "",
    answerType: "MULTIPLE_CHOICE",
    answerExplanationImages: [],
    answers: [],
  });

  const addQuizWriteForm = (id: number) => {
    setQuizWriteList((prev) => [
      ...prev,
      {
        id: id,
        quizWriteFormType: "MULTIPLE_CHOICE", // TODO: BasicFormType으로 변수화
        component: (
          <QuizWriteFormItem
            id={id}
            deleteQuizWriteForm={deleteQuizWriteForm}
            quizWriteFormType={"MULTIPLE_CHOICE"}
          />
        ),
      },
    ]);
  };

  const onClickAddQuizWriteForm = () => {
    const id = Date.now();
    const newQuestion: BookQuizQuestionType = createNewQuestion(id);
    addQuizWriteForm(id);
    updateQuizCreationInfo("questions", [
      ...(quizCreationInfo.questions ?? []),
      newQuestion,
    ]);
    console.log("info: %o", quizCreationInfo);
  };

  return (
    <div className={styles["container"]}>
      <DragDropContext onDragEnd={moveQuizWriteForm}>
        <Droppable droppableId="cardlists">
          {(provided) => (
            <div
              className="cardlists"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {quizWriteFormList.map((item, index) => (
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
        onClick={onClickAddQuizWriteForm}
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
    </div>
  );
}
