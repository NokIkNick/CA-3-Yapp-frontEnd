import React, { useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    background: var(--green);
    padding: 16px;
    margin: 16px;
    width: 90%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    color: var(--basewhite);
`;

const TextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    resize: none;
`;

const SubmitButton = styled.button`
    padding: 8px 16px;
    cursor: pointer;
`;

const ReplyButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
`;

export default function EditForm({ editContent, setEditContent, handleSubmit, cancelEdit }) {
    useEffect(() => {
        if (editContent === '') {
            setEditContent(editContent);
        }
    }, [editContent, setEditContent]);

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <TextArea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                />
                <SubmitButton type="submit">Submit Edit</SubmitButton>
                <ReplyButton onClick={cancelEdit}>Cancel</ReplyButton>
            </form>
        </FormContainer>
    );
}
