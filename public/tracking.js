// tracking.js - Basic Analytics Tracking Script

(function() {
    const BACKEND_ANALYTICS_ENDPOINT = 'http://localhost:8000/analytics/ingest';

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[[]/, '\[').replace(/[]]/, '\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Get job_id from URL if available (e.g., passed from n8n after page creation)
    const jobId = getUrlParameter('job_id');
    const sessionId = localStorage.getItem('session_id') || 'sess_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('session_id', sessionId);

    // Function to send an event to the backend
    function sendEvent(eventType, metadata = {}) {
        const eventData = {
            job_id: jobId || 'unknown', // Use job_id from URL or 'unknown'
            event_type: eventType,
            session_id: sessionId,
            metadata: {
                ...metadata,
                page_path: window.location.pathname,
                page_title: document.title,
                referrer: document.referrer,
                user_agent: navigator.userAgent,
            }
        };

        fetch(BACKEND_ANALYTICS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        })
        .then(response => {
            if (!response.ok) {
                console.error('Failed to send analytics event:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error sending analytics event:', error);
        });
    }

    // --- Initial Page View Event ---
    // Send a page_view event when the script loads
    sendEvent('page_view');

    // --- Example of Custom Event Tracking ---
    // You can expose a global function for other parts of the page to call
    window.trackAnalyticsEvent = sendEvent;

    // Example: Track CTA clicks (assuming CTAs have a specific class or data attribute)
    document.addEventListener('click', function(event) {
        if (event.target.matches('.track-cta-click')) { // Example class
            sendEvent('cta_click', { cta_text: event.target.innerText });
        }
    });

})();
