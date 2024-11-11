import { Link } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Button } from 'src/components/common/button';
import { H1, H2, Image, useTheme, View, XStack, YStack } from 'tamagui';
import fitrackerLogo from '../../../assets/fitracker-transparent-logo.png';

export default function AuthHome() {
    const theme = useTheme();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
            <View flex={1} paddingHorizontal='$space.5' justifyContent='center'>
                <XStack alignItems='center' justifyContent='center'>
                    <Image
                        alignSelf='center'
                        transform={[{ translateY: -35 }]}
                        source={fitrackerLogo}
                        width={90}
                        height={90}
                    />
                    <H1 textAlign='center' marginBottom='$space.9'>
                        Fitracker
                    </H1>
                    <Image
                        alignSelf='center'
                        transform={[{ translateY: -35 }]}
                        scaleX={-1}
                        source={fitrackerLogo}
                        width={90}
                        height={90}
                    />
                </XStack>
                <YStack gap='$space.4'>
                    <Link href='/signup/EnterEmail' asChild>
                        <Button backgroundColor='$blue10' color='white'>
                            Create New Account
                        </Button>
                    </Link>
                    <Link href='/login' asChild>
                        <Button borderColor='$blue10' color='$blue10' variant='outlined'>
                            Login
                        </Button>
                    </Link>
                </YStack>
            </View>
        </SafeAreaView>
    );
}
