import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './Navigator.scss';

const SubMenu = ({ name, link, onLinkClick }) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <li className={`sub-menu ${isActive ? 'active' : ''}`}>
      <Link to={link} className="sub-menu-link" onClick={onLinkClick}>
        <FormattedMessage id={name} />
      </Link>
    </li>
  );
};

const Menu = ({ name, link, subMenus, onLinkClick }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive =
    (link && location.pathname === link) ||
    (subMenus && subMenus.some((sm) => sm.link === location.pathname));

  useEffect(() => {
    if (subMenus && subMenus.some((sm) => sm.link === location.pathname)) {
      setIsOpen(true);
    }
  }, [location, subMenus]);

  return (
    <li className={`menu ${isActive ? 'active' : ''}`}>
      {subMenus ? (
        <Fragment>
          <span
            className="menu-link"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <FormattedMessage id={name} />
            <div className="icon-right">
              <i className="far fa-angle-right" />
            </div>
          </span>
          {isOpen && (
            <ul className="sub-menu-list list-unstyled">
              {subMenus.map((subMenu, i) => (
                <SubMenu
                  key={i}
                  name={subMenu.name}
                  link={subMenu.link}
                  onLinkClick={onLinkClick}
                />
              ))}
            </ul>
          )}
        </Fragment>
      ) : (
        <Link to={link} className="menu-link" onClick={onLinkClick}>
          <FormattedMessage id={name} />
        </Link>
      )}
    </li>
  );
};

const MenuGroup = ({ name, menus, onLinkClick }) => {
  const location = useLocation();

  // active nếu 1 trong các menu con hoặc submenu match với path hiện tại
  const isGroupActive = menus?.some(
    (menu) =>
      location.pathname === menu.link ||
      (menu.subMenus &&
        menu.subMenus.some((sub) => sub.link === location.pathname))
  );

  return (
    <li className="menu-group">
      <div
        className={`menu-group-name ${isGroupActive ? 'active' : ''}`}
      >
        <FormattedMessage id={name} />
      </div>
      <ul className="menu-list list-unstyled">
        {menus?.map((menu, i) => (
          <Menu
            key={i}
            name={menu.name}
            link={menu.link}
            subMenus={menu.subMenus}
            onLinkClick={onLinkClick}
          />
        ))}
      </ul>
    </li>
  );
};

const Navigator = ({ menus, onLinkClick }) => {
  return (
    <ul className="navigator-menu list-unstyled">
      {menus.map((group, i) => (
        <MenuGroup
          key={i}
          name={group.name}
          menus={group.menus}
          onLinkClick={onLinkClick}
        />
      ))}
    </ul>
  );
};

export default Navigator;
