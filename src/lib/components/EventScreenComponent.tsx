import { Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import styled from "styled-components/native";
import { Event } from '../model/Event';
import Icon from 'react-native-vector-icons/AntDesign';
import { useEventStore } from '../store';
import shallow from 'zustand/shallow';
import { useState } from 'react';
import { useEffect } from 'react';

const StyledView = styled.View`
    height: 100%;
    width: 100%;
    position: relative;
`;

const OpacityOverlay = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 5;
    background-color: rgba(0, 0, 0, 0.5);

    flex: 1;
    justify-content: center;
    align-items: center;

    opacity: ${props => props.visible ? 1 : 0};
`;

const BaseText = styled.Text`
    color: black;
    text-align: center;
`;

const When = styled(BaseText)`
    letter-spacing: 2px;
    font-weight: 500;
    font-size: 18px;
    margin-top: 12px;
`;

const Title = styled(BaseText)`
    margin-top: 16px;
    font-weight: bold;
    font-size: 36px;
`;

const Location = styled(BaseText)`
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 3px;
`;

const StyledImageBackground = styled.ImageBackground`
    flex: 1;
`;

const LikeButton = styled.TouchableOpacity`
    position: absolute;
    z-index: 10;
    bottom: 16px;
    left: 16px;
`;

const LikeButtonContainer = styled.View`
    background-color: white;
    border-radius: 50px;
    padding: 8px 12px;

    flex: 1;
    justify-content: center;
    align-items: center;
`;

export type EventScreenProps = {
    event: Event
}

const EventScreenComponent = ({ event }: EventScreenProps) => {
    const [eventLikes, toggleLike] = useEventStore(state => [state.likes, state.toggleLike], shallow);

    const [liked, setLiked] = useState(false);
    const [showOverlay, setOverlay] = useState(true);

    useEffect(() => {
        setLiked(eventLikes.has(event.id));
    }, [eventLikes, event])

    const handlePressLike = () => {
        toggleLike(event.id);
        setLiked(liked => !liked);
    }

    return <StyledView>
        <StyledImageBackground source={event.image_src} resizeMode="cover">
            <Title>{event.title}</Title>
            <Location>{event.location_string}</Location>
            <When>{event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} @ {event.time}</When>
        </StyledImageBackground>
        <LikeButton
            onPress={handlePressLike}
        >
            <LikeButtonContainer>
                <Icon name={liked ? 'heart' : 'hearto'} size={24} color="#ff0000" />
            </LikeButtonContainer>
        </LikeButton>
        <OpacityOverlay visible={showOverlay}>
            <TouchableWithoutFeedback style={{ zIndex: 5 }} onPress={() => setOverlay(showOverlay => !showOverlay)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', padding: 12, }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>{event.description}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 36, alignItems: 'center' }}>
                        {event.people_going.slice(0, 3).map(profile => (<>
                            <Image source={profile.profile_src} style={{ height: 40, width: 40, borderRadius: 40 }} />
                        </>))}
                        <Text style={{ color: 'white', fontSize: 16, fontStyle: '300', marginLeft: 8 }} >and 12 others are going</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </OpacityOverlay>
    </StyledView >
}

export default EventScreenComponent;