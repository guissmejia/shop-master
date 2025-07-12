import React, { useState } from "react";
import {
  Layout,
  Menu,
  Badge,
  Button,
  Space,
  Typography,
  Drawer,
  Switch,
  ConfigProvider,
  theme,
  FloatButton,
} from "antd";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  ShoppingOutlined,
  MenuOutlined,
  BulbOutlined,
  BulbFilled,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import ProductCatalogPage from "./components/pages/ProductCatalogPage";
import ShoppingCartPage from "./components/pages/ShoppingCartPage";
import { COLORS, THEME_CONFIG } from "./config/colors";
import { useCartContext, CartProvider } from "./hooks/useCartContext";
import { useTheme } from "./hooks/useTheme";

const { Header, Content } = Layout;
const { Title } = Typography;

const MainAppContent = () => {
  const [currentView, setCurrentView] = useState("catalog");
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme();
  const { cartItemCount } = useCartContext();

  const handleContinueShopping = () => {
    setCurrentView("catalog");
  };

  const handleViewChange = (key) => {
    setCurrentView(key);
    setMobileMenuVisible(false);
  };

  const menuItems = [
    {
      key: "catalog",
      icon: <HomeOutlined />,
      label: "Catálogo",
    },
    {
      key: "cart",
      icon: (
        <Badge count={cartItemCount} size="small">
          <ShoppingCartOutlined />
        </Badge>
      ),
      label: "Carrito",
    },
  ];

  const themeConfig = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: COLORS.primary.main,
      colorSuccess: COLORS.status.success,
      colorWarning: COLORS.status.warning,
      colorError: COLORS.status.error,
      colorInfo: COLORS.status.info,
      borderRadius: 8,
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout
        style={{
          minHeight: "100vh",
          background: isDarkMode
            ? COLORS.background.dark
            : COLORS.background.main,
        }}
      >
        {/* Header */}
        <Header
          style={{
            background: isDarkMode
              ? COLORS.gradients.headerDark
              : COLORS.gradients.header,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          {/* Logo y título */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "opacity 0.3s ease",
            }}
            onClick={() => handleViewChange("catalog")}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <ShoppingOutlined
              style={{
                fontSize: 32,
                color: COLORS.text.white,
                marginRight: 16,
              }}
            />
            <Title level={3} style={{ color: COLORS.text.white, margin: 0 }}>
              ShopMaster
            </Title>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Menú desktop */}
            <div className="desktop-menu">
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[currentView]}
                items={menuItems}
                onClick={({ key }) => handleViewChange(key)}
                style={{
                  background: "transparent",
                  border: "none",
                  minWidth: 250,
                }}
              />
            </div>

            {/* Toggle de tema */}
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              checkedChildren={
                <BulbFilled style={{ color: COLORS.text.white }} />
              }
              unCheckedChildren={
                <BulbOutlined style={{ color: COLORS.text.white }} />
              }
              style={{
                backgroundColor: isDarkMode
                  ? COLORS.status.success
                  : COLORS.text.light,
                borderColor: "transparent",
              }}
            />

            <div className="mobile-menu">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuVisible(true)}
                style={{ color: COLORS.text.white, fontSize: "18px" }}
              />
            </div>
          </div>
        </Header>

        {/* Drawer para menú móvil */}
        <Drawer
          title="Menú"
          placement="right"
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          width={250}
        >
          <Menu
            mode="vertical"
            selectedKeys={[currentView]}
            items={menuItems}
            onClick={({ key }) => handleViewChange(key)}
            style={{ border: "none" }}
          />
        </Drawer>

        {/* Contenido principal */}
        <Content
          style={{
            padding: "24px",
            background: isDarkMode
              ? COLORS.background.dark
              : COLORS.background.main,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {currentView === "catalog" ? (
              <ProductCatalogPage isDarkMode={isDarkMode} />
            ) : (
              <ShoppingCartPage
                onContinueShopping={handleContinueShopping}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        </Content>

        {/* Botón flotante de atención al cliente */}
        <FloatButton
          icon={<CustomerServiceOutlined />}
          type="primary"
          tooltip="Atención al Cliente"
          style={{ right: 20, bottom: 20 }}
        />

        {/* Botón flotante del carrito - solo visible en móvil */}
        <div className="mobile-cart-button">
          <FloatButton
            icon={
              <Badge count={cartItemCount} size="small">
                <ShoppingCartOutlined />
              </Badge>
            }
            type="primary"
            tooltip="Ir al Carrito"
            onClick={() => handleViewChange("cart")}
            style={{
              right: 20,
              bottom: 80,
              background: COLORS.gradients.button,
              border: "none",
            }}
          />
        </div>

        {/* Estilos CSS para responsividad */}
        <style jsx>{`
          @media (min-width: 768px) {
            .desktop-menu {
              display: block !important;
            }
            .mobile-menu {
              display: none !important;
            }
            .mobile-cart-button {
              display: none !important;
            }
          }

          @media (max-width: 767px) {
            .desktop-menu {
              display: none !important;
            }
            .mobile-menu {
              display: block !important;
            }
            .mobile-cart-button {
              display: block !important;
            }
          }
        `}</style>
      </Layout>
    </ConfigProvider>
  );
};

const MainApp = () => {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
};

export default MainApp;
