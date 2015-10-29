#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define STATUS_WINNER 'WIN!'

typedef struct _word_struct
{
    char word[32];
    char result[48];
    int status;
} word_struct, *word_data;

int get_input(char *word, int len)
{
    int wordSize = 0;
    char *locWord = malloc(len+4);
    if(!locWord)
        return -2;
    printf("Enter your guess: ");
    fgets(locWord,len+4,stdin);
    wordSize = strlen(locWord);
    // strip newline character
    if(locWord[wordSize-1] == '\n')
        locWord[wordSize-1] = '\0';
    if(strlen(locWord) > len)
    {
	free(locWord);
	return -1;
    }
    strcpy(word,locWord);
    free(locWord);
    return 1;
}

void check_input(word_data w)
{
    //todo: implement this
    printf("Incorrect word!\n");
    w->status = strlen(w->word);
}

int give_flag(word_data w)
{
    if(w->status == STATUS_WINNER)
    {
        // open the file and print it
        FILE *fp;
	char flag[100];
	fp = fopen("flag","r");
	if(!fp)
	{   
	    printf("oops, sorry... good job?\n");
	    return -1;
	}
	fscanf(fp,"%s",flag);
	printf("flag: %s\n",flag);
	fclose(fp);
        return 0;
    }
    printf("NO FLAG FOR YOU!\n");
    return -2;
}

int main(int argc, char **argv)
{
    word_struct guess;
    int i,offset,len,ret;
    printf("Welcome to Guess the Magic Word!\n");
    printf("Guess the magic word and get the flag!\n");
    ret = get_input(guess.word, sizeof(guess.word));
    if(ret == -1)
    {
        printf("Exiting due to buffer overflow!\n");
        return -1;
    }
    else if(ret == -2)
    {
        printf("Out of resources! Exiting...\n");
        return -2;
    }
    check_input(&guess);
    // print out the result
    if(guess.status == STATUS_WINNER)
        strcpy(guess.result,"CORRECT! YOU ENTERED: ");
    else
        strcpy(guess.result,"WRONG! YOUR WORD:  ");
    offset = strlen(guess.result);
    len = strlen(guess.word);
    for(i = 0; i < len; ++i)
        guess.result[offset+i] = guess.word[i];
    guess.result[offset+i] = '\0';
    // give them the flag?
    printf("%s\n",guess.result);
    ret = give_flag(&guess);
    if(ret == 0)
        printf("Good job!\n");
    else if(ret == -1)
        printf("Sorry, file error!\n");
    else
        printf("Better luck next time!\n");
    return 0;
}
