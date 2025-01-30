const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_PUBLIC_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Fetch Instagram Data (Replace with real API call)
async function fetchInstagramData() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a username');
        return;
    }

    // Example: Use RapidAPI to fetch Instagram data
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
            'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(`https://instagram-scraper-api2.p.rapidapi.com/v1/info?username=${username}`, options);
        const data = await response.json();
        displayAccountInfo(data);
        displayInsights(data);
        displayHashtags(data.hashtags);
    } catch (error) {
        console.error('Error fetching Instagram data:', error);
    }
}

// Display Account Info
function displayAccountInfo(data) {
    document.getElementById('info-username').textContent = data.username;
    document.getElementById('info-followers').textContent = data.followers;
    document.getElementById('info-following').textContent = data.following;
    document.getElementById('info-posts').textContent = data.posts;
    document.getElementById('account-info').classList.remove('hidden');
}

// Display Insights
function displayInsights(data) {
    document.getElementById('insight-engagement').textContent = `${data.engagementRate}%`;
    document.getElementById('insight-avg-likes').textContent = data.avgLikes;
    document.getElementById('insight-avg-comments').textContent = data.avgComments;
    document.getElementById('insight-top-post-type').textContent = data.topPostType;
    document.getElementById('insight-best-time').textContent = data.bestTimeToPost;
    document.getElementById('insights').classList.remove('hidden');
}

// Display Hashtags
function displayHashtags(hashtags) {
    const hashtagList = document.getElementById('hashtag-list');
    hashtagList.innerHTML = '';
    hashtags.forEach(hashtag => {
        const li = document.createElement('li');
        li.textContent = hashtag;
        hashtagList.appendChild(li);
    });
    document.getElementById('recommendations').classList.remove('hidden');
}