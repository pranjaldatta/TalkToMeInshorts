### How to use 

To be documented!


### Course Of Action 

* For the CLI tool : 

  User should be able to do all the following from CLI itself : 
  
  1. Set AWS creds through JSON files.
  2. Set Polly voice 
  3. Set category of short to be fetched
  4. Number of shorts to be fetched
  5. Choose a save destination
  6. Choose whether to just save or save n play through CLI

* For the GUI tool : 
  
  1. Build the frontend using flutter (duh) 
  
* Keep in mind: 
  
  1. Best to stick with one common callGetShorts that handles all the various needs.
  2. Try to limit scrapping+speech synthesis to one function
  3. Many files may feel redundant now like server.js, routes.js etc. Wait for the the frontend!
  
* For Speech Synthesis : 

  While Polly is great, a drawback is that it's paid . So a free/open source speech synthesis engine implementation needs to be found and given as an alternative option to the user. Once the engine has been found and decided upon, possibly the entire codebase needs to be altered to accomodate this alternate option. The changed codebase shouldnt change anything for the user i.e. the user should be able to do all of which is mentioned in the preceeding sections from the CLI and GUI tools
