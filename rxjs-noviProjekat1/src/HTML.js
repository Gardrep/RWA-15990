export const HTML = {
    ClassesText() {
        return `<div class="container-fluid">
            <blockquote class="blockquote">
                <p class="mb-0">Choose your class.</p>
            </blockquote>
        </div>`
    },

    ClassesTamplate(obj) {
        return `<tr test-click>
        <td>${ obj.id}</td>
        <td>${ obj.name}</td>
        <td>
            <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top"
                title="${ obj.description}">
                description
            </button>
        </td>
        <td>${ obj.hit_die}</td>
        <td>
            <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top"
                title="${ obj.proficiency_choices}">
                proficiency choices
            </button>
        </td>
        <td>
            <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top"
                title="${ obj.proficiencies}">
                proficiencies
            </button>
        </td>
        <td>${ obj.saving_throws}</td>
        <td>${ obj.starting_equipment}</td>
        <td>${ obj.class_level}</td>
        <td>${ obj.subclasses}</td>
        <td>${ obj.spellcasting}</td>
    </tr>`
    },

    RacesText() {
        return `<div class="container-fluid">
            <blockquote class="blockquote">
                <p class="mb-0">Choose your race.</p>
            </blockquote>
        </div>`
    },

    RacesTamplate(obj) {
        return `<tr test-click>
        <td>${ obj.id}</td>
        <td>${ obj.name}</td>
        <td>${ obj.speed}</td>
        <td>${ obj.ability_bonuses}</td>
        <td>${ obj.size}</td>
        <td>${ obj.starting_proficiencies}</td>
        <td>${ obj.languages}</td>
        <td>${ obj.traits}</td>
        <td>${ obj.subraces}</td>
    </tr>`
    },

    SpellsText() {
        return `<div class="container-fluid">
            <blockquote class="blockquote">
                <p class="mb-0">Choose your spells.</p>
            </blockquote>
        </div>`
    },

    SpellsTamplate(obj) {
        return `<tr test-click>
        <td>${ obj.id}</td>
        <td>${ obj.name}</td>
        <td>${ obj.level}</td>
        <td>${ obj.range}</td>
        <td>${ obj.ritual}</td>
        <td>${ obj.duration}</td>
        <td>${ obj.concentration}</td>
        <td>${ obj.casting_time}</td>
        <td>${ obj.school}</td>
        <td>${ obj.classes}</td>
        <td>
            <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="left"
                title="${ obj.desc}">
                description
            </button>
        </td>
    </tr>`
    },

    CharactersText() {
        return `<div class="container-fluid">
            <blockquote class="blockquote">
                <p class="mb-0">Here you can choose characteristics for your character.</p>
                <p class="mb-0">First choose your name.</p>
            </blockquote>
        </div>`
    },

    CharactersTamplate(character, showrace, showclass) {
        return `<tr test-click>
        <td>${ character.id}</td>
        <td>${ character.name}</td>
        <td>${ showclass.name}</td>
        <td>${ showrace.name}</td>
        <td>${ character.spells}</td>
    </tr>`
    }
}