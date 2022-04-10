
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import EVENTS from "../../lib/mockEvents";
import EventScreenComponent from '../../lib/components/EventScreenComponent';
import { useMemo, useState } from 'react';

const SCROLL_TIMEOUT_MS = 750;

export default function Discover() {
    const [eventIdx, setEventIdx] = useState(0);
    const currEvent = useMemo(() => {
        return EVENTS[eventIdx];
    }, [eventIdx]);
    const [canSwitch, setCanSwitch] = useState(true);

    const incrementEventIdx = () => {
        if (eventIdx < EVENTS.length) {
            setEventIdx(idx => idx + 1);
        }
    }

    const decrementEventIdx = () => {
        if (eventIdx > 0) {
            setEventIdx(idx => idx - 1);
        }
    }

    return (
        <SafeAreaView style={{ height: '100%', flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                onScroll={(props) => {
                    if (props.nativeEvent.contentOffset.y > 75) {
                        // Scroll down detected
                        setCanSwitch(false);
                        if (canSwitch) incrementEventIdx();
                        setTimeout(() => {
                            setCanSwitch(true);
                        }, SCROLL_TIMEOUT_MS);
                    } else if (props.nativeEvent.contentOffset.y < -75) {
                        // Scroll up detected
                        setCanSwitch(false);
                        if (canSwitch) decrementEventIdx();
                        setTimeout(() => {
                            setCanSwitch(true);
                        }, SCROLL_TIMEOUT_MS);
                    }
                }}
                scrollEventThrottle={1}
            >
                {eventIdx < EVENTS.length
                    ? <EventScreenComponent event={currEvent} />
                    : <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: "center", fontSize: 24 }}>No more events {"😔"}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 8}}>Swipe up to go back to the events</Text>
                    </View>}

            </ScrollView>
        </SafeAreaView>
    );
}