# Cryptocurrency-webhook
  A discord webhook that displays crypto currency rates on a timed interval(specified in spreadsheet)

## Requirements
* A google spreadsheet to maintain and store crypto currency data
>![image](https://user-images.githubusercontent.com/74867349/121248954-a8225e00-c8c1-11eb-8a76-f007b65419ae.png)

>![image](https://user-images.githubusercontent.com/74867349/121249432-3696df80-c8c2-11eb-9fd1-22a1c72899a0.png)

>![image](https://user-images.githubusercontent.com/74867349/121249565-58906200-c8c2-11eb-9cd8-81101474de22.png)

* #### A discord webhook url

## Setting up
* Create a spreadsheet as per above shown images
* Open tools => Script editor to open Google App Script
* Copy the files in the repo
* Set Triggers(postUpdates: every minute and sendUpdates: every hour)
* Note: Dont forget to use discord webhook url in places mentioned in code

### And you are good to go!!