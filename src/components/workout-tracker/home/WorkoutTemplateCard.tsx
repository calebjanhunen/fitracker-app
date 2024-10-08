import React, { Dispatch, SetStateAction, useState } from 'react';
import { IWorkoutTemplateResponse } from 'src/api/workout-template-service/responses/IWorkoutTemplateResponse';
import { Card, SizableText } from 'tamagui';
import WorkoutTemplateModal from './WorkoutTemplateModal';

interface Props {
    workoutTemplate: IWorkoutTemplateResponse;
    setIsWorkoutFormOpening: Dispatch<SetStateAction<boolean>>;
}

export default function WorkoutTemplateCard({ workoutTemplate, setIsWorkoutFormOpening }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <>
            <WorkoutTemplateModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                workoutTemplate={workoutTemplate}
                setIsWorkoutFormOpening={setIsWorkoutFormOpening}
            />
            <Card flex={0.47} onPress={() => setIsModalOpen(true)}>
                <Card.Header elevate bordered borderRadius='$radius.5' padding='$3' height='$11'>
                    <SizableText size='$4' fontWeight='bold' numberOfLines={1}>
                        {workoutTemplate.name}
                    </SizableText>
                    <SizableText numberOfLines={5} size='$2' lineHeight='$1' color='$gray11'>
                        {workoutTemplate.exercises.map((e) => e.exerciseName).join(', ')}
                    </SizableText>
                </Card.Header>
            </Card>
        </>
    );
}
