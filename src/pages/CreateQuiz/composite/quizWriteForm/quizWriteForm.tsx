import { ReactNode, useState } from "react";
import styles from "./_quiz_write_form.module.scss";
import Button from "@/components/atom/button/button.tsx";
import QuizWriteFormItem from "@/pages/CreateQuiz/composite/quizWriteForm/quizWriteFormItem.tsx";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Plus } from "@/svg/plus.tsx";
import { primary } from "@/styles/abstracts/colors.ts";

// 3. 퀴즈 작성
export interface QuizWriteFormItemType {
  id: number;
  component: ReactNode;
}

export default function QuizWriteForm() {
  const [quizWriteFormList, setQuizWriteList] = useState<QuizWriteFormItemType[]>([]);

  const deleteQuizWriteForm = (targetId: number) => {
    setQuizWriteList((prevQuizList) => {
      return prevQuizList.filter(({ id }) => id !== targetId);
    });
  };

  const moveQuizWriteForm = (result:  DropResult) => {
    if (!result.destination) return;
    const items = [...quizWriteFormList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuizWriteList(items);
  };

  const onClickAddQuizWriteForm = () => {
    const id = Date.now();
    setQuizWriteList((prev) => [
      ...prev,
      {
        id: id,
        component: <QuizWriteFormItem id={id} deleteQuizWriteForm={deleteQuizWriteForm}/>,
      },
    ]);
  };


  return (
    <div className={styles["container"]}>
      <DragDropContext onDragEnd={moveQuizWriteForm}>
        <Droppable droppableId="cardlists">
          {(provided) => (
            <div className="cardlists" {...provided.droppableProps} ref={provided.innerRef}>
              {quizWriteFormList.map((item,index) => (
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
        <Plus stroke={primary} width={24} height={24}/>
      </Button>
    </div>
  );
}
