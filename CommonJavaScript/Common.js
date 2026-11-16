console.log("Common Connected");

function findById(List, Id)
{
    let Position = -1;
    for(let i = 0; i < List.length; i++)
    {
        if(List[i].id === Id)
        {
            Position = i;
            break;
        }
    }
    return Position;
}

function isModeratorId(Id)
{
    let Expression = /^MOD-[0-9][0-9][0-9][0-9]$/;
    return Expression.test(Id);
}

function isEmail(Email)
{
    let Expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Expression.test(Email);
}

function isUrl(Url)
{
    if(Url.indexOf("http://") !== 0 && Url.indexOf("https://") !== 0)
    {
        return false;
    }
    if(Url.indexOf(".") === -1 || Url.indexOf(" ") !== -1)
    {
        return false;
    }
    return true;
}
