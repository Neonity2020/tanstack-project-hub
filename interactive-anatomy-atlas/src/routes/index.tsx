import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AnatomyAtlas } from '../components/AnatomyAtlas';
import { headAnatomyParts } from '../data/anatomyData';
import styled from '@emotion/styled';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
`;

const Header = styled.header`
  padding: 1rem;
  background: #1a1a1a;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #aaa;
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <PageContainer>
      <Header>
        <div>
          <Title>交互式解剖图谱</Title>
          <Subtitle>点击查看详细解剖结构信息</Subtitle>
        </div>
      </Header>
      <MainContent>
        <AnatomyAtlas 
          imageUrl="/images/brain-bottom-view.png"
          parts={headAnatomyParts} 
        />
      </MainContent>
    </PageContainer>
  );
}
