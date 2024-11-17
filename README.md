# Canny Debugging Test

Howdy Candidate, we've created this pared down version of Canny to get a better
idea of your experience debugging web applications. Best of luck!

## Getting Started

1. **Initialize your environment**

We recommend using nvm for managing node versions.

Install nvm from [here](https://github.com/creationix/nvm)

Then install the node version for this assessment:

```sh
nvm i
```

1. **Install dependencies**

Next you'll need to install this app

```sh
npm install
```

1. **Run the backend**

The backend is a node server. Everything to do with the server lives in
`/server`.

Terminal tab #1:

```sh
npm run backend
```

1. **Run the frontend**

Webpack is used to bundle and serve our app. Everything to do with the frontend
lives in `/app`.

Terminal tab #2:

```sh
npm run frontend
```

Once everything is running, you should see the app running
http://127.0.0.1:8080.

## Customer Issues

For each of the following issues:

1. Identify the issue
1. Apply the fix
1. Provide a response to each technical customer in 1-2 sentences

---

### **Customer 1:** When I open the application, my posts do not load and all I see is a 'server error'.

There were a string of issues here, I'll list them out in the order I found
them.

#### The Diagnosis

1. The string `"server error"` was returned to the client instead of providing
   more details about the underlying issue. I first modified the code to provide
   the specific error message.
1. In the `HTTPServer` class, a call to `authenticateUser()` was failing with
   `"unauthorized"` - however, this was misleading because the `catch()` block
   was catching the error and returning a hard-coded string `"unauthorized"`
   instead of a reference to `error.message`. Ater fixing this, the actual
   underlying error message is `"Missing name in user data"` which led me to the
   root cause...
1. Within the dummy data in `AJAX.js`, the `SSOToken` decoded has a `nayme`
   property (typo) instead of `name`. To find this, I used
   [jwt.io](https://jwt.io/) to paste in the original token and check the
   values.

#### The Fix

To fix, I used [jwt.io](https://jwt.io/) to rename `nayme` to `name` in the
payload, then used the `"SingleSignOnKey"` value from `authenticateUser.js` to
generate a new token.

#### Response to Customer

_"My apologies, it looks like we weren't passing the correct property name in
the authorization token, which caused the server to fail the request. This has
been resolved, please let me know if you run into this issue again. Thanks!"_

---

### **Customer 2:** When I click on "Top" or "Old", the selector does not update with my new selection.

#### The Diagnosis

This is a rendering issue, it looks like the component is not subscribed to
changes to the `sort` object's values. As a result, it doesn't know the values
were changed, so it doesn't update. I haven't used React Redux before, so I'm
not familiar with this pattern.

#### The Fix

I fixed the issue by passing in the entire `sort` object to the `Selector`
subcomponent. Then I determined whether an option was meant to be in the
`selected` state based on the current value of `sort.name`. This seemed to do
the trick in ensuring the component re-rendered.

#### Response to Customer

_"Thank you for letting us know about this issue! There was a disconnect between
the data and the component that was supposed to display it - this has been
patched and resolved. Please reach out if you encounter anything else."_

---

### **Customer 3:** When I sort by "Top", there are posts with only 28 votes ranking higher than posts with 180 votes!

#### The Diagnosis

It looks like the sort method is using string comparison somewhere. String "28"
ranks higher than "180" because the initial character "2" in "28" comes after
"1" in "180"

#### The Fix

I had a hard time unraveling the custom algorithm because I'm not familiar with
it. So I used a standard `.sort` method with a/b comparator function. This is
not a great choice if there was a performance implication in sorting the data on
the server, however I believe that overhead could potentially be offset with a
more performant query on the database side -- or, I could spend more time
figuring out where to patch within the algo. Open for discussion!

#### Response to Customer

_"Thank you for catching this! It looks like our sorting algorithm had a bug.
This has been fixed, please let me know if all looks good on your end. Thank
you!"_

### **Customer 4:** When I page through posts, although the posts are changing, the vote count in the top left corner does not match the total count of votes of the displayed posts.

#### The Diagnosis

This appears to be a render issues because the value of `votes` isn't changing,
so the component doesn't re-render.

#### The Fix

I removed the separate `recountVotes` logic and included it directly within the
state updates in the `PostsLoaded` reducer. This way, it's always updated on
time and doesn't get delayed.

#### Response to Customer

_"Thank you so much for letting us know about this issue. The underlying issue
had to do with the order in which data was being processed after being fetched.
We've fixed this issue, please do let us know if something else pops up!"_

## Notes on Solutions

This assessment took me much longer to complete than I anticipated. This largely
had to do with two areas:

1. I got lost in the weeds on the divide & conquer algorithm. I'm not familiar
   enough with this, and I spent too much time trying to fix what was in place
   rather than replacing it with something that worked. In a team environment,
   this may not be the best approach though, and I'd spend more time
   understanding the original code and fixing it in place if I felt it was
   better that way.
1. I've never used React Redux before outside of a brief tutorial years ago. So
   I had to take a bit of time to understand how the state was being handled.
   This ate up a bunch of time.

## Notes on My Assessment Experience

Thank you for putting this assessment together!

I found when troubleshooting and getting familiar with the code, I'd make some
changes here and there - however, without `git` tracking in place, it was
difficult to stay on top of where changes were made. For future test-takers, it
would be much easier to be able to clone or fork a GitHub repo, then open a PR
with the fixes. This would help with transparency in reviewing the changes, as
well as during the dev/debugging process.

Thanks again for your consideration!

## 🎉 You're Done 🎉

Congrats on completing our assessment. All that is left for you to do is submit
your assessment. We made a command that will zip your submission and send it to
us.

```sh
npm run submit
```
