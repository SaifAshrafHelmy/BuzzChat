import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

export function ToggleColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <header>
            <Button
                onClick={toggleColorMode}
                pos={"absolute"}
                top={0}
                right={0}
                margin={"1rem"}
            >
                {colorMode === "light" ? <MoonIcon color={"blue.700"} /> : <SunIcon color={"orange.400"} />}
            </Button>
        </header>
    );
}
