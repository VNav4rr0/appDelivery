import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions,
    Animated,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/colors';
import { Pokeball } from '@/components/pokeball';

type SidebarLayoutProps = {
    children: React.ReactNode;
};

export function SidebarLayout({ children }: SidebarLayoutProps) {
    const { isAuthenticated, signOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [slideAnim] = useState(new Animated.Value(-280));

    const toggleMobileMenu = () => {
        if (isMobileMenuOpen) {
            Animated.timing(slideAnim, {
                toValue: -280,
                duration: 250,
                useNativeDriver: false,
            }).start(() => setIsMobileMenuOpen(false));
        } else {
            setIsMobileMenuOpen(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }).start();
        }
    };

    const authenticatedLinks = [
        { label: '🌿 Pokédex', route: '/pokedex' },
        { label: '⚔️ Batalha', route: '/battle' },
        { label: '🛡️ Meu Time', route: '/team' },
        { label: '👤 Perfil', route: '/profile' },
    ];

    const unauthenticatedLinks = [
        { label: '🔑 Entrar', route: '/' },
        { label: '📝 Cadastrar', route: '/register' },
    ];

    const links = isAuthenticated ? authenticatedLinks : unauthenticatedLinks;

    const navigateTo = (route: string) => {
        if (Platform.OS !== 'web') {
            toggleMobileMenu();
        }
        router.push(route as any);
    };

    const handleLogout = async () => {
        if (Platform.OS !== 'web') {
            toggleMobileMenu();
        }
        await signOut();
        router.replace('/');
    };

    const isWeb = Platform.OS === 'web';

    const renderNavLinks = () => {
        return (
            <View style={styles.linksContainer}>
                {links.map((link) => {
                    const isActive = pathname === link.route || (link.route === '/' && pathname === '/(auth)');
                    return (
                        <TouchableOpacity
                            key={link.route}
                            style={[
                                styles.navLink,
                                isActive && styles.activeNavLink,
                            ]}
                            onPress={() => navigateTo(link.route)}
                        >
                            <Text
                                style={[
                                    styles.navLinkText,
                                    isActive && styles.activeNavLinkText,
                                ]}
                            >
                                {link.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}

                {isAuthenticated && (
                    <TouchableOpacity
                        style={[styles.navLink, styles.logoutLink]}
                        onPress={handleLogout}
                    >
                        <Text style={[styles.navLinkText, styles.logoutText]}>
                            🚪 Sair
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    if (isWeb) {
        return (
            <View style={styles.webContainer}>
                <View style={styles.sidebar}>
                    <View style={styles.sidebarHeader}>
                        <Pokeball size={26} />
                        <Text style={styles.sidebarTitle}>PokeBattle</Text>
                    </View>
                    
                    {renderNavLinks()}
                </View>

                <View style={styles.webContent}>
                    {children}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.mobileContainer}>
            <View style={styles.mobileHeader}>
                <TouchableOpacity onPress={toggleMobileMenu} style={styles.hamburgerBtn}>
                    <Text style={styles.hamburgerText}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.mobileHeaderTitle}>PokeBattle</Text>
                <View style={styles.mobileHeaderRight}>
                    <Pokeball size={20} />
                </View>
            </View>

            <View style={styles.mobileContent}>
                {children}
            </View>

            {isMobileMenuOpen && (
                <TouchableOpacity
                    style={styles.drawerOverlay}
                    activeOpacity={1}
                    onPress={toggleMobileMenu}
                >
                    <Animated.View
                        style={[
                            styles.drawer,
                            { left: slideAnim }
                        ]}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        <View style={styles.drawerHeader}>
                            <Pokeball size={24} />
                            <Text style={styles.drawerTitle}>PokeBattle</Text>
                            <TouchableOpacity onPress={toggleMobileMenu} style={styles.closeBtn}>
                                <Text style={styles.closeBtnText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        {renderNavLinks()}
                    </Animated.View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    webContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.background,
        minHeight: '100vh' as any,
    },
    sidebar: {
        width: 240,
        backgroundColor: Colors.surface,
        borderRightWidth: 1.5,
        borderColor: Colors.primaryAlpha['18'],
        padding: 24,
        gap: 32,
        ...Platform.select({
            web: {
                position: 'sticky',
                top: 0,
                height: '100vh',
                boxShadow: '4px 0 20px rgba(0,0,0,0.4)',
            } as any
        })
    },
    sidebarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    sidebarTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
        fontFamily: Platform.OS === 'web' ? "'Press Start 2P', monospace" : undefined,
    },
    webContent: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    mobileContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    mobileHeader: {
        height: 60,
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryAlpha['18'],
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    hamburgerBtn: {
        padding: 8,
    },
    hamburgerText: {
        color: Colors.white,
        fontSize: 24,
    },
    mobileHeaderTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    mobileHeaderRight: {
        padding: 8,
    },
    mobileContent: {
        flex: 1,
    },

    linksContainer: {
        flex: 1,
        gap: 8,
    },
    navLink: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: 'transparent',
    },
    activeNavLink: {
        backgroundColor: Colors.primaryAlpha['18'],
        borderWidth: 1,
        borderColor: Colors.primaryAlpha['60'],
    },
    navLinkText: {
        color: Colors.whiteAlpha['55'],
        fontSize: 14,
        fontWeight: '600',
    },
    activeNavLinkText: {
        color: Colors.btnPrimary,
        fontWeight: 'bold',
    },
    logoutLink: {
        marginTop: 'auto',
    },
    logoutText: {
        color: '#F44336',
    },

    drawerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 9999,
    },
    drawer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 280,
        backgroundColor: Colors.surface,
        padding: 24,
        gap: 32,
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    drawerTitle: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '900',
        flex: 1,
        marginLeft: 8,
    },
    closeBtn: {
        padding: 8,
    },
    closeBtnText: {
        color: Colors.white,
        fontSize: 18,
    },
});
