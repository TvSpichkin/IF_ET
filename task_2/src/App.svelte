<script>
    var value1 = 100, k = 0.5, value2 = k*value1, type1 = "RUB", type2 = "USD", info, names;
    
    function changeValue1() {
        value1 = Math.round(100*value2/k)/100;
    }
    function changeValue2() {
        value2 = Math.round(100*k*value1)/100;
    }
    function changeK() {
        k = info.rates[type2]/info.rates[type1];
        changeValue2();
    }
    
    async function getInfo() {
        const res = await fetch('https://open.er-api.com/v6/latest/RUB');

        if(res.ok) {
            info = await res.json();
            names = Object.keys(info.rates);
            changeK();
            
            return 1;
        } else {
            throw new Error('Запрос не выполнен');
        }
    }
    
    let promise = getInfo();
</script>

<main>
    {#await promise}
        <p>Ожидание получения актуальной информации</p>
    {:then}
        <label>
            <p>Не имей</p>
            <input type="text" bind:value={value1} on:input={changeValue2} />
            <select bind:value={type1} on:change={changeK}>
                {#each names as name}
                    <option value={name}>
                        {name}
                    </option>
                {/each}
            </select>
        </label>
        <label>
            <p>А имей</p>
            <input type="text" bind:value={value2} on:input={changeValue1} />
            <select bind:value={type2} on:change={changeK}>
                {#each names as name}
                    <option value={name}>
                        {name}
                    </option>
                {/each}
            </select>
        </label>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
    <a id='ref' href="https://www.exchangerate-api.com">Курсы по API обменного курса</a>
</main>

<style>
    #ref {
        font-size: 10px;
        position: absolute;
        right: 10px;
        bottom: 5px;
    }
</style>
