import React from 'react';
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

export default function NewReplyForm({ newReplyContent, setNewReplyContent, handleSubmit, cancelReply }) {
    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <TextArea
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                />
                <SubmitButton type="submit">Submit Reply</SubmitButton>
                <ReplyButton onClick={cancelReply}>Cancel</ReplyButton>
            </form>
        </FormContainer>
    );
}
