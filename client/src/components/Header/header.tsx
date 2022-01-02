import {
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
} from 'carbon-components-react';
import React from 'react';
import { Logout20 } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

interface headerProps {}

export const Header: React.FC<headerProps> = () => {
  const headerName = 'Campus';
  const headerTailName = 'Placement';

  const navigate = useNavigate();
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Interview Management">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix={headerName}>
              {headerTailName}
            </HeaderName>

            <HeaderGlobalBar>
              <HeaderGlobalAction
                onClick={(e) => {
                  navigate('/login');
                }}
                aria-label="Search"
              >
                <Logout20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>
        </>
      )}
    />
  );
};
