/**React Hook import */
import React from 'react';

/**Material-UI imports */
import { CircularProgress } from '@mui/material';

/**LOADING MODAL***************************************************************/
/**this is a component that will display a spinner over a darken screen */
/**used for a waiting screen during async calls */

const Loading = ({message}) => {

    const styles = {
        /************************************************************************** */
        /**LOADING STYLES */

        //styles for the entire loading modal
        loadingModal:{
            height:'100vh',
            width:'100vw',
            backgroundColor:'#18191a',
            opacity:.3,
            position:'absolute',
            top:0,
            left:0,
            zIndex:15
        },

        //styles for the icon inside the modal
            loadingModalIcon:{
            position: 'absolute',
            top: '30%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 50
        }
    }

/******************************************************************************/
    /**Rendering */  

    return (
        <div style={styles.LoadingModal}>
            <div style={styles.loadingModalIcon}> {message ? message : "...Loading"} <CircularProgress color="inherit"/></div>
        </div>
    )
}

export default Loading