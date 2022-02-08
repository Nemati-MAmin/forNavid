const User = require("../../model/User");
const secret = 'secret-key'


exports.login = async (req, res) => {
    const data = req.body.data;
    try{
        const user = await User.findOne({ email: data.email });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
              const hashedPass  = await bcrypt.hash(data.password, salt);

            const accessToken = jwt.sign(
                {
                    id: user._id,
                },
                secret,
                { expiresIn: "30min" }
            );
            const newUser = new User({
                email: data.email,
                password: hashedPass,
            });

            const user = await newUser.save();
            const { email } = user._doc;
            res.status(200).json({ email, accessToken });
        }
        else {

              const comparedHashed = await bcrypt.compare(data.password, user.password);
        
            if (comparedHashed){
            const accessToken = jwt.sign(
                {
                    id: user._id,
                },
                secret,
                { expiresIn: "30min" }
            );
            const { email } = user._doc;
            res.status(200).json({ email, accessToken });
            }
            else {
                res.status(400).json(err);
            }
        }

    } catch (error) {
        res.status(500).json(err);
    }
}

exports.refreshToken = (req, res, next) => {
    
}