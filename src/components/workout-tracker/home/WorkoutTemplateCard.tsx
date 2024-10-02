import React, { useState } from 'react';
import { Card, SizableText } from 'tamagui';
import WorkoutTemplateModal from './WorkoutTemplateModal';

export default function WorkoutTemplateCard() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <>
            <WorkoutTemplateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Card flex={0.47} onPress={() => setIsModalOpen(true)}>
                <Card.Header elevate bordered borderRadius='$radius.5' padding='$3'>
                    <SizableText size='$6' fontWeight='bold'>
                        Template
                    </SizableText>
                    <SizableText numberOfLines={5} size='$3' lineHeight='$1'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero enim laborum
                        culpa, nostrum voluptates veniam aperiam. Vel architecto perspiciatis dolor.
                        Aspernatur consequatur eum a tempora sit reiciendis accusantium soluta.
                        Doloremque.
                    </SizableText>
                </Card.Header>
            </Card>
        </>
    );
}
