import { useState } from "react";
import styles from "./_quiz_write_form.module.scss";
import Button from "@/components/atom/button/button.tsx";
import QuizWriteFormItem from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormItem.tsx";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Plus } from "@/svg/plus.tsx";
import { primary } from "@/styles/abstracts/colors.ts";
import { useAtom } from "jotai";
import { BookQuizType } from "@/types/BookQuizType";
import { QuizCreationInfoAtom } from "@/store/quizAtom";
import { QuizWriteFormItemType } from "@/types/BookQuizType";
// 3. 퀴즈 작성

export default function QuizWriteForm() {
  const [quizCreationInfo, setQuizCreationInfo] = useAtom<BookQuizType>(QuizCreationInfoAtom);
  const deleteQuizWriteForm = (targetId: number) => {

    setQuizWriteList((prevQuizList) => {
      return prevQuizList.filter(({ id }) => id !== targetId);
    });

    setQuizCreationInfo((prevQuizList) => {
      const updatedQuestions = prevQuizList.questions?.filter((question) => question.id !== targetId) ?? [];
      return {
        ...prevQuizList,
        questions: updatedQuestions,
      }
    }); 
  };

  const setInitialForms = (): QuizWriteFormItemType[] => {
    const quizWriteForms: QuizWriteFormItemType[] = 
    quizCreationInfo.questions?.map((question) => (
      {
        id: question.id,
        quizWriteFormType: question.answerType,
        component: <QuizWriteFormItem id={question.id} deleteQuizWriteForm={deleteQuizWriteForm} quizWriteFormType = {question.answerType}/>,
      }
    ) as QuizWriteFormItemType) ?? [];

    return quizWriteForms;
  }
  const [quizWriteFormList, setQuizWriteList] = useState<QuizWriteFormItemType[]>(setInitialForms());


  const moveQuizWriteForm = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...quizWriteFormList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuizWriteList(items);

    //TODO: quiz, questions 이름 api와 통일 필요
    //TODO: 위의 겹치는 로직과 리팩토링 필요
    const globalQuizItems = [...quizCreationInfo.questions??[]];
    const [reorderedGlobalItem] = globalQuizItems.splice(result.source.index, 1);
    globalQuizItems.splice(result.destination.index,0,reorderedGlobalItem);
    setQuizCreationInfo((prev) => (
      {
        ...prev,
        questions: globalQuizItems,
      }
    ));
  };

  const onClickAddQuizWriteForm = () => {
    const id = Date.now();
    setQuizWriteList((prev) => [
      ...prev,
      {
        id: id,
        quizWriteFormType: "MULTIPLE_CHOICE", // TODO: BasicFormType으로 변수화
        component: <QuizWriteFormItem id={id} deleteQuizWriteForm={deleteQuizWriteForm} quizWriteFormType={"MULTIPLE_CHOICE"}/>,
      },
    ]);

    // 퀴즈 질문 초기 값 생성
    setQuizCreationInfo((prev) => (
      {
        ...prev,
        questions: [
          ...prev.questions ?? [],
          {
            id: id,
            content: "",
            selectOptions: [],
            answerExplanationContent: "",
            answerType: "MULTIPLE_CHOICE",
            answerExplanationImages: [],
            answers: [],
          },
        ]
      })
    );

    console.log("info: %o",quizCreationInfo);
  };


  return (
    <div className={styles["container"]}>
      <DragDropContext onDragEnd={moveQuizWriteForm}>
        <Droppable droppableId="cardlists">
          {(provided) => (
            <div className="cardlists" {...provided.droppableProps} ref={provided.innerRef}>
              {quizWriteFormList.map((item, index) => (
                <Draggable draggableId={`${item.id}`} index={index} key={`${item.id}`}>
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
        size={"xlarge"}
        onClick={onClickAddQuizWriteForm}
        className={styles["add-quiz"]}>
        <span>문제 추가하기</span>
        <Plus stroke={primary} width={24} height={24} />
      </Button>
    </div>
  );
}
