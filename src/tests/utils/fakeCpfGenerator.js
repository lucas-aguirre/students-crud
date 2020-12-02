class FakeCpfGenerator {
    generateCpf = () => {
        const num1 = this.generateRandomNumber(),
              num2 = this.generateRandomNumber(),
              num3 = this.generateRandomNumber();

        const dig1 = this.generateDigit(num1, num2, num3),
              dig2 = this.generateDigit(num1, num2, num3, dig1);

        return `${num1}${num2}${num3}${dig1}${dig2}`;
    }

    generateDigit = (n1, n2, n3, n4) => {
        let nums = n1.split("").concat(n2.split(""), n3.split(""));

        if (n4) {
            nums[9] = n4;
        }

        let x = 0;

        for (let i = (n4 ? 11 : 10), j = 0; i >= 2; i--, j++) {
            x += parseInt(nums[j]) * i;
        }

        const y = x % 11;

        return y < 2 ? 0 : 11 - y;
    }

    generateRandomNumber = () => {
        const aleat = Math.floor(Math.random() * 999);
        return ("" + aleat).padStart(3, '0');
    }

}

module.exports = new FakeCpfGenerator();