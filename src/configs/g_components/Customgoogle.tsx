import {
    useLoadScript,
    GoogleMap,
    MarkerF,
    CircleF,
} from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FormLabel, MenuItem, Skeleton, TextField } from '@mui/material';
import CustomZoneLoader from './CustomZoneLoader';


const PlacesAutocomplete = ({ onAddressSelect, isloading = false, labelName }: { labelName: string, isloading?: boolean, onAddressSelect?: (address: string) => void }) => {
    const {
        ready,
        value,
        suggestions: { status, data, loading },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        // requestOptions: { componentRestrictions: { country: 'us' } },
        debounce: 300,
        cache: 86400,
    });

    const renderSuggestions = () => {
        if (loading) {
            return <p>Loading...</p>;
        }

        return data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
                description,
            } = suggestion;

            return (
                <MenuItem
                    key={place_id}
                    onClick={() => {
                        setValue(description, false);
                        clearSuggestions();
                        onAddressSelect && onAddressSelect(description);
                    }}>
                    <strong>{main_text}</strong>&nbsp;&nbsp;<small>{secondary_text}</small>
                </MenuItem>
            );
        });
    };

    return (<>

        {isloading ? <>
            <Skeleton variant="text" width={140} height={30} />
            <Skeleton variant="text" width={"100%"} height={45} />
        </> : <>
            <FormLabel>{labelName}</FormLabel>
            <TextField sx={{ mb: 4 }} value={value} disabled={!ready} onChange={(e) => setValue(e.target.value)} fullWidth size='small' placeholder='Search Your Location ....' />
        </>}

        {status === 'OK' && (
            <> {renderSuggestions()}</>
        )}

    </>
    );
};

const Customgoogle = ({ showmap = false, setValue, registerName, labelName, isloading = false }: { isloading: boolean, labelName: string, showmap?: boolean, setValue: any, registerName: string }) => {

    const defaultMapCenter = {
        lat: 35.8799866,
        lng: 76.5048004
    }

    const defaultMapZoom = 18

    const [mapLatLng, setmapLatLng] = useState(defaultMapCenter)

    const libraries = ['places', 'drawing', 'geometry'];

    const defaultMapContainerStyle = {
        width: '100%',
        height: '35vh',
        borderRadius: '15px 0px 0px 15px',
    };

    const defaultMapOptions = {
        zoomControl: true,
        tilt: 0,
        gestureHandling: 'auto',
        mapTypeId: 'satellite',
    };

    const mapOptions = useMemo<google.maps.MapOptions>(() => ({
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: false,
        zoomControl: true
    }), []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as any,
    });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    const onAddressSelect = (address: string) => {
        getGeocode({ address: address }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            setmapLatLng({ lat, lng })
        });
        setValue(registerName, address)
    }
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

    return (<>

        <PlacesAutocomplete isloading={isloading} labelName={labelName} onAddressSelect={onAddressSelect} />

        {showmap && <>
            {isloading ? <Skeleton variant="rectangular" {...defaultMapContainerStyle}/> :
                <GoogleMap
                    // options={defaultMapOptions}
                    options={mapOptions}
                    zoom={defaultMapZoom}
                    center={mapLatLng}
                    mapTypeId={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={defaultMapContainerStyle}

                // onLoad={(map) => console.log('Map Loaded')}
                >
                    <MarkerF position={mapLatLng} onLoad={() => <CustomZoneLoader />} />

                    {/* {[10, 25].map((radius, idx) => {
                    return (
                        <CircleF
                            key={idx}
                            center={mapLatLng}
                            radius={radius}
                            onLoad={() => console.log('Circle Load...')}
                            options={{
                                fillColor: radius > 1000 ? 'red' : 'green',
                                strokeColor: radius > 1000 ? 'red' : 'green',
                                strokeOpacity: 0.8,
                            }}
                        />
                    );
                })} */}
                </GoogleMap>
            }
        </>}


    </>);
};



export default Customgoogle;