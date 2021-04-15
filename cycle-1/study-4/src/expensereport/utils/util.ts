export const changeToUsdFormat = (amount: number) => {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USA'}).format(amount);
};
