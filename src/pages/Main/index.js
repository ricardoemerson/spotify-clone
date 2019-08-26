import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Wrapper, Container, Content } from './styles';

import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import Header from '../../components/Header';

import ErrorBox from '../../components/ErrorBox';

import Routes from '../../routes';

const Main = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Container>
          <Sidebar />
          <Content>
            <ErrorBox />
            <Header />
            <Routes />
          </Content>
        </Container>
        <Player />
      </Wrapper>
    </BrowserRouter>
  );
};

export default Main;
