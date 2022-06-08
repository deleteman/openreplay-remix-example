import {v4 as uuidV4} from 'uuid'

function defaultGetUserId() {
    return uuidV4() 
}

type TrackerConfig = {
    projectKey: string,
    userIdEnabled?: boolean,
    getUserId?: () => string
}

export function startTracker(config: TrackerConfig) {
    let tracker = null;
    let Tracker = null
    let userId = "";
    
    (async () => {
        Tracker  = await import('@openreplay/tracker')
        console.log(Tracker)
        
        console.log("Starting tracker...")
        console.log("Custom configuration received: ", config)
        
        const getUserId = (config?.userIdEnabled && config?.getUserId) ? config.getUserId : defaultGetUserId
        
        const trackerConfig: TrackerConfig = {
            projectKey: config?.projectKey //|| process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY
        }
        
        console.log("Tracker configuration")
        console.log(trackerConfig)
        tracker = new Tracker(trackerConfig);
        
        if(config?.userIdEnabled) {
            userId = getUserId()
            tracker.setUserID(userId)
        }
        
        
        tracker.start();
        
    })()
    
    return {
        tracker,
        userId
    }
}
