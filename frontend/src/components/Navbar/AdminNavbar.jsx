import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faCut, faCalendarAlt, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { Menu as AntMenu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Dashboard from '../../pages/Admin/dashboard';
import AdminServices from '../../pages/Admin/services';
import AdminBookings from '../../pages/Admin/bookings';
import Users from '../../pages/Admin/users';
import Reports from '../../pages/Admin/reports';
import classes from './Sidebar.module.css';

const items = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <FontAwesomeIcon icon={faGauge} />,
    
  },
  {
    key: 'bookings',
    label: 'Bookings',
    icon: <FontAwesomeIcon icon={faCalendarAlt} />,
  },
  {
    key: 'services',
    label: 'Services',
    icon: <FontAwesomeIcon icon={faCut} />,
  },
  {
    key: 'users',
    label: 'Users',
    icon: <FontAwesomeIcon icon={faUsers} />,
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: <FontAwesomeIcon icon={faChartBar} />,
  },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleTabChange = (e) => {
    setActiveTab(e.key);
  };

  return (
    <div className={classes.wrapper}>
      <div className={`${classes.sidebar} ${collapsed ? classes.collapsed : ''}`}>
        <AntMenu
          onClick={handleTabChange}
          selectedKeys={[activeTab]}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items.map((item) => ({
            ...item,
            className: activeTab === item.key ? classes.activeTab : '',
          }))}
        />
      </div>

      <div className={`${classes.content} ${collapsed ? classes.collapsedContent : ''}`}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'services' && <AdminServices />}
        {activeTab === 'bookings' && <AdminBookings />}
        {activeTab === 'users' && <Users />}
        {activeTab === 'reports' && <Reports />}
      </div>

      <div className={classes.hamburgerMenu}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
          />
          <MenuList>
            <MenuItem as="button" onClick={() => handleTabChange({ key: 'dashboard' })} className={classes.menuItem}>
              Dashboard
            </MenuItem>
            <MenuItem as="button" onClick={() => handleTabChange({ key: 'services' })} className={classes.menuItem}>
              Services
            </MenuItem>
            <MenuItem as="button" onClick={() => handleTabChange({ key: 'bookings' })} className={classes.menuItem}>
              Bookings
            </MenuItem>
            <MenuItem as="button" onClick={() => handleTabChange({ key: 'users' })} className={classes.menuItem}>
              Users
            </MenuItem>
            <MenuItem as="button" onClick={() => handleTabChange({ key: 'reports' })} className={classes.menuItem}>
              Reports
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
