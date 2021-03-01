This is a Crypto Kitties based clone built using a template given by Ivan On Tech's blockchain dev bootcamp course.

You can create, breed, collect, buy, or sell unique digital cats based on the ERC-721 standard.

The initial project only allowed the owner of the Cat Contract to create generation zero cats, but to allow a more open environment I removed
the onlyOwner modifier. This now lets any user create a generation zero cat until 30 total are made. After that all new cats are made through
breeding in the breed page. There is no limit as to how many can be made this way.

Another modification to the original project is the addition of rare DNA numbers only gained through breeding two cats. The numbers in the gene strand correlating to color in the factory range from 10-89. When breeding the numbers 90-99 are able to be given to the cat resulting in colors not able to be seen otherwise. When successfully created, these cats containing rare DNA will be highlighted in yellow and have a large rare DNA badge overhead the cat.
