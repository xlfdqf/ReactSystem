import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import config from "@/config";
const {copyRightText}  = config;

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
      
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> {copyRightText}
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
