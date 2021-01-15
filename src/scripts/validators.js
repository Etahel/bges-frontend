export const checkRegex = (reg) =>
    (value) => {
    if(value) {
        return reg.test(value)
    } else {
        return true;
    }};
