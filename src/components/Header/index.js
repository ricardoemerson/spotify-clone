import React from 'react';

import { Container, Search, User } from './styles';

const Header = () => {
  return (
    <Container>
      <Search>
        <input type="text" placeholder="Search" />
      </Search>

      <User>
        <img src="https://avatars2.githubusercontent.com/u/2879795?v=4" alt="Avatar" />
        Ricardo Emerson
      </User>

    </Container>
  );
};

export default Header;
