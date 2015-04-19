# meanperformance
============

This repo is for the internal developer conference at [http://352inc.com](352).  The branches incrementally show how to implement the most basic web performance methodologies using the MEAN stack and were built in the following order:

1. master
2. useref
3. rev
4. compression
5. minify
6. ngannotate

## Installation

Except for master, each branch will need to be setup as follows:

1.  git checkout -b [branchname] origin/[branchname]
2.  npm install

## Running the App

The root directory contains a bin folder.  To run a local webserver of the non-optimized site, just run

    ./bin/www

If you prefer to see the optimized version, build the site

    gulp

then navigate into the new build directory

    cd build

finally, run the optimized site.

    ./bin/www
