# What is it?

A small map built using React and Leaflet that displays the TW thralls and their locations.

# Help me gather data!

I don't know all the spots myself, and I would appreciate filling in the gaps.

I will require at least the following:
* A TeleportPlayer command

You can open an issue here with your teleports or leave me a DM on discord.

If you are familiar with git and GitHub, you may just edit the ``data.json`` in ``public`` yourself and open a pull request.

# Run it
Want to run it locally? It runs without any backend, and is hosted on GH pages. Simply install git and NodeJS (and the bundled npm)
and run these in your command line:

1. ``git clone https://github.com/Nia292/tw-map.git``
2. ``cd tw-map``
3. ``npm install``
4. ``npm start``

Then open your browser on ``http://localhost:3000``

# Adapting for broader use

I made this map because I was annoyed of having to remember the locations all the time. In theory, this map
could be adapted to actually display any data you like.

If you would like to do this yourself, you actually just need a little bit of React knowledge. If you want to host yourself,
no server is required, since GitHub allows you to host it through GH pages as long as your repo is public.

Here is what you would do:

1. Fork this repository
2. Go to repository settings and enable GH pages on the main branch and the docs directory
3. Start adapting the application

If you do need help on the third step, feel free to let me know!

## Deploying

For now, it's not automated *at all*. I usually do these steps:

1. Locally, delete the ``docs`` directory
2. Run ``npm build``
3. Rename the ``build`` directory to ``docs``
4. Commit and push
