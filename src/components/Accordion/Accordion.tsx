import React, { type Dispatch, type SetStateAction } from 'react';
import { FlatList } from 'react-native';

import AccordionSection from './AccordionSection';

export interface AccordionData {
    id: number;
    title: string;
    text: string;
}

interface Props {
    data: AccordionData[];
    selectedSection: number;
    setSelectedSection: Dispatch<SetStateAction<number>>;
    expandedSection: number;
    setExpandedSection: Dispatch<SetStateAction<number>>;
}

export default function Accordion({
    data,
    selectedSection,
    setSelectedSection,
    expandedSection,
    setExpandedSection,
}: Props): React.ReactElement {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <AccordionSection
                    data={item}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    expandedSection={expandedSection}
                    setExpandedSection={setExpandedSection}
                />
            )}
        />
    );
}
