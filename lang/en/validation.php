<?php

return [

	/*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

	'accepted' => 'The :attribute must be accepted.',
	'accepted_if' => 'The :attribute must be accepted when :other is :value.',
	'active_url' => 'The :attribute is not a valid URL.',
	'after' => 'The :attribute must be a date after :date.',
	'after_or_equal' => 'The :attribute must be a date after or equal to :date.',
	'alpha' => 'The :attribute must only contain letters.',
	'alpha_dash' => 'The :attribute must only contain letters, numbers, dashes and underscores.',
	'alpha_num' => 'The :attribute must only contain letters and numbers.',
	'array' => 'The :attribute must be an array.',
	'ascii' => 'The :attribute must only contain single-byte alphanumeric characters and symbols.',
	'before' => 'The :attribute must be a date before :date.',
	'before_or_equal' => 'The :attribute must be a date before or equal to :date.',
	'between' => [
		'array' => 'The :attribute must have between :min and :max items.',
		'file' => 'The :attribute must be between :min and :max kilobytes.',
		'numeric' => 'The :attribute must be between :min and :max.',
		'string' => 'The :attribute must be between :min and :max characters.',
	],
	'boolean' => 'The :attribute field must be true or false.',
	'confirmed' => 'The :attribute confirmation does not match.',
	'current_password' => 'The password is incorrect.',
	'date' => 'The :attribute is not a valid date.',
	'date_equals' => 'The :attribute must be a date equal to :date.',
	'date_format' => 'The :attribute does not match the format :format.',
	'decimal' => 'The :attribute must have :decimal decimal places.',
	'declined' => 'The :attribute must be declined.',
	'declined_if' => 'The :attribute must be declined when :other is :value.',
	'different' => 'The :attribute and :other must be different.',
	'digits' => 'The :attribute must be :digits digits.',
	'digits_between' => 'The :attribute must be between :min and :max digits.',
	'dimensions' => 'The :attribute has invalid image dimensions.',
	'distinct' => 'The :attribute field has a duplicate value.',
	'doesnt_end_with' => 'The :attribute may not end with one of the following: :values.',
	'doesnt_start_with' => 'The :attribute may not start with one of the following: :values.',
	'email' => 'The :attribute must be a valid email address.',
	'ends_with' => 'The :attribute must end with one of the following: :values.',
	'enum' => 'The selected :attribute is invalid.',
	'exists' => 'The selected :attribute is invalid.',
	'file' => 'The :attribute must be a file.',
	'filled' => 'The :attribute field must have a value.',
	'gt' => [
		'array' => 'The :attribute must have more than :value items.',
		'file' => 'The :attribute must be greater than :value kilobytes.',
		'numeric' => 'The :attribute must be greater than :value.',
		'string' => 'The :attribute must be greater than :value characters.',
	],
	'gte' => [
		'array' => 'The :attribute must have :value items or more.',
		'file' => 'The :attribute must be greater than or equal to :value kilobytes.',
		'numeric' => 'The :attribute must be greater than or equal to :value.',
		'string' => 'The :attribute must be greater than or equal to :value characters.',
	],
	'image' => 'The :attribute must be an image.',
	'in' => 'The selected :attribute is invalid.',
	'in_array' => 'The :attribute field does not exist in :other.',
	'integer' => 'The :attribute must be an integer.',
	'ip' => 'The :attribute must be a valid IP address.',
	'ipv4' => 'The :attribute must be a valid IPv4 address.',
	'ipv6' => 'The :attribute must be a valid IPv6 address.',
	'json' => 'The :attribute must be a valid JSON string.',
	'lowercase' => 'The :attribute must be lowercase.',
	'lt' => [
		'array' => 'The :attribute must have less than :value items.',
		'file' => 'The :attribute must be less than :value kilobytes.',
		'numeric' => 'The :attribute must be less than :value.',
		'string' => 'The :attribute must be less than :value characters.',
	],
	'lte' => [
		'array' => 'The :attribute must not have more than :value items.',
		'file' => 'The :attribute must be less than or equal to :value kilobytes.',
		'numeric' => 'The :attribute must be less than or equal to :value.',
		'string' => 'The :attribute must be less than or equal to :value characters.',
	],
	'mac_address' => 'The :attribute must be a valid MAC address.',
	'max' => [
		'array' => 'The :attribute must not have more than :max items.',
		'file' => 'The :attribute must not be greater than :max kilobytes.',
		'numeric' => 'The :attribute must not be greater than :max.',
		'string' => 'The :attribute must not be greater than :max characters.',
	],
	'max_digits' => 'The :attribute must not have more than :max digits.',
	'mimes' => 'The :attribute must be a file of type: :values.',
	'mimetypes' => 'The :attribute must be a file of type: :values.',
	'min' => [
		'array' => 'The :attribute must have at least :min items.',
		'file' => 'The :attribute must be at least :min kilobytes.',
		'numeric' => 'The :attribute must be at least :min.',
		'string' => 'The :attribute must be at least :min characters.',
	],
	'min_digits' => 'The :attribute must have at least :min digits.',
	'multiple_of' => 'The :attribute must be a multiple of :value.',
	'not_in' => 'The selected :attribute is invalid.',
	'not_regex' => 'The :attribute format is invalid.',
	'numeric' => 'The :attribute must be a number.',
	'password' => [
		'letters' => 'The :attribute must contain at least one letter.',
		'mixed' => 'The :attribute must contain at least one uppercase and one lowercase letter.',
		'numbers' => 'The :attribute must contain at least one number.',
		'symbols' => 'The :attribute must contain at least one symbol.',
		'uncompromised' => 'The given :attribute has appeared in a data leak. Please choose a different :attribute.',
	],
	'present' => 'The :attribute field must be present.',
	'prohibited' => 'The :attribute field is prohibited.',
	'prohibited_if' => 'The :attribute field is prohibited when :other is :value.',
	'prohibited_unless' => 'The :attribute field is prohibited unless :other is in :values.',
	'prohibits' => 'The :attribute field prohibits :other from being present.',
	'regex' => 'The :attribute format is invalid.',
	'required' => 'The :attribute field is required.',
	'required_array_keys' => 'The :attribute field must contain entries for: :values.',
	'required_if' => 'The :attribute field is required when :other is :value.',
	'required_if_accepted' => 'The :attribute field is required when :other is accepted.',
	'required_unless' => 'The :attribute field is required unless :other is in :values.',
	'required_with' => 'The :attribute field is required when :values is present.',
	'required_with_all' => 'The :attribute field is required when :values are present.',
	'required_without' => 'The :attribute field is required when :values is not present.',
	'required_without_all' => 'The :attribute field is required when none of :values are present.',
	'same' => 'The :attribute and :other must match.',
	'size' => [
		'array' => 'The :attribute must contain :size items.',
		'file' => 'The :attribute must be :size kilobytes.',
		'numeric' => 'The :attribute must be :size.',
		'string' => 'The :attribute must be :size characters.',
	],
	'starts_with' => 'The :attribute must start with one of the following: :values.',
	'string' => 'The :attribute must be a string.',
	'timezone' => 'The :attribute must be a valid timezone.',
	'unique' => 'The :attribute has already been taken.',
	'uploaded' => 'The :attribute failed to upload.',
	'uppercase' => 'The :attribute must be uppercase.',
	'url' => 'The :attribute must be a valid URL.',
	'ulid' => 'The :attribute must be a valid ULID.',
	'uuid' => 'The :attribute must be a valid UUID.',

	/*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

	'custom' => [
		'attribute-name' => [
			'rule-name' => 'custom-message',
		],
		'*' => [
			'required' => 'O campo :attribute é obrigatório.',
			'required_if' => 'O campo :attribute é obrigatório quando :other é :value.',
			'email' => 'O campo :attribute deve ser um email válido.',
			'unique' => 'O valor do campo :attribute já está em uso.',
			'exists' => 'O recurso com valor informado no campo :attribute não foi encontrado.',
			'array' => 'O atributo :attribute deve ser um array.',
			// 'required' => [
			// 	'array' => 'O campo :attribute é obrigatório.'
			// ],
			'min' => [
				'array' => 'O valor do campo :attribute deve ter pelo menos :min items.',
				'file' => 'O campo :attribute deve ter pelo menos :min kilobytes.',
				'numeric' => 'O campo :attribute deve ter um valor de pelo menos :min.',
				'string' => 'O campo :attribute deve ter um valor de pelo menos :min caracteres.',
			],
			'max' => [
				'array' => 'O valor do campo :attribute deve ter pelo menos :min items.',
				'file' => 'O campo :attribute deve ter pelo menos :min kilobytes.',
				'numeric' => 'O campo :attribute deve ter um valor de pelo menos :min.',
				'string' => 'O campo :attribute deve ter um valor de pelo menos :min caracteres.',
			],
			'gt' => [
				'array' => 'O valor do campo :attribute deve ter mais de :value itens.',
				'file' => 'O valor do campo :attribute deve ser maior que :value kilobytes.',
				'numeric' => 'O valor do campo :attribute deve ser maior que :value.',
				'string' => 'O valor do campo :attribute deve ser maior que :value caracteres.',
			],
			'lt' => [
				'array' => 'O valor do campo :attribute deve ter menos de :value itens.',
				'file' => 'O valor do campo :attribute deve ser menor que :value kilobytes.',
				'numeric' => 'O valor do campo :attribute deve ser menor que :value.',
				'string' => 'O valor do campo :attribute deve ser menor que :value caracteres.',
			],
			'date_format' => 'o valor do campo :attribute não corresponde ao formato :format.',
			'after' => 'O valor do campo :attribute deve ser maior que :date.',
			'before_or_equal' => 'O valor do campo :attribute deve ser antes ou igual a :date.',
			'digits' => 'O valor do campo :attribute deve :digits dígitos.',
			'numeric' => 'O valor do campo :attribute deve ser numérico.',
		],
	],

	/*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

	'attributes' => [
		'account_number' => 'nº de conta bancária',
		'address' => 'endereço',
		'amount' => 'valor',
		'amount_paid' => 'valor pago',
		'amount_to_pay' => 'valor a pagar',
		'athlete_id' => 'atleta',
		'balance' => 'saldo',
		'bank_name' => 'nome do banco',
		'base_salary' => 'salário base',
		'contract_end_date' => 'data de fim de contrato',
		'country_id' => 'país',
		'current_weight' => 'peso actual',
		'created_at' => 'data de criação',
		'date' => 'data',
		'date_of_birth' => 'data de nascimento',
		'dependents' => 'número de dependentes',
		'description' => 'descrição',
		'document_issue_date' => 'data de emissão',
		'document_number' => 'número do documento',
		'document_type' => 'tipo de documento',
		'due_date' => 'data de vencimento',
		'education_degree' => 'nível académico',
		'email' => 'e-mail',
		'employee_id' => 'funcionário',
		'ends_at' => 'data de fim',
		'gender' => 'género',
		'goal_weight' => 'peso meta',
		'hire_date' => 'data da contratação',
		'iban' => 'iban',
		'id' => 'identificação',
		'inss' => 'INSS',
		'initial_balance' => 'saldo inicial',
		'marital_status' => 'estado civil',
		'month' => 'mês',
		'municipality_id' => 'município',
		'name' => 'nome',
		'nif' => 'nif',
		'neighborhood' => 'bairro',
		'occupation' => 'profissão',
		'operation_type' => 'tipo de operação',
		'paid' => 'pago',
		'password' => 'senha',
		'password_confirmation' => 'confirmação da senha',
		'payment_method' => 'forma de pagamento',
		'payment_type' => 'tipo de pagamento',
		'phone' => 'telefone',
		'phone2' => 'telefone 2',
		'position' => 'cargo',
		'price' => 'preço',
		'province_id' => 'província',
		'relationship' => 'parentesco/vínculo laboral',
		'renewal_date' => 'data de renovação',
		'social_security' => 'segurança social',
		'starts_at' => 'data de início',
		'starting_weight' => 'peso inicial',
		'updated_at' => 'data de atualização',
		'user_id' => 'criado por',
		'user_id_update' => 'atualizado por',
		'user_name' => 'nome de usuário',
		'year' => 'ano',
	],

];
